// card-games/crimsonfront/config/battleFx.mjs — CrimsonFront 战斗 FX presenter（游戏专属，允许 hex/卡 id/密钥）
// 迁自 crimsonfront/modules/battle/fx/{spellPresentation,spellCastFX,soundFX}.js。
//
// v2 契约：createBattleFx(services) → { playAttack, playSpell, sfxFor }
//   services = { particles, sound, getState, getRects, reducedMotion }
//   playAttack/playSpell 收 { ..., applyFn, computeFacts, render }：
//     applyFn()      施加引擎命令
//     computeFacts() 返回框架富化 facts（{damages,heals,deaths,summons,controlSwitched,buffs,draws}）
//     render()       重绘棋盘
//   演出序列：windup → applyFn → f=computeFacts() → 在未重绘的旧 DOM 上放粒子 → render()
//   getRects(target)：target ∈ {minion id, 'base:0'|'base:1', 'field:0'|'field:1', 'hand'}
//     → { x, y, w, h }（中心坐标 + 尺寸，相对 particle-layer）或 null。
//   所有 presenter DOM 挂进 particles.container（全屏 particle-layer），坐标一律 container-relative。
//   视频覆盖层由框架 playVideoOverlay 挂 document.body（框架自持）。
import { playVideoOverlay } from '../../../framework/ui/shell/fx/videoOverlay.mjs';
import { playAttackAnimation } from '../../../framework/ui/shell/fx/attackAnimator.mjs';
import { xorBytes, VIDEO_XOR_KEY, SPELL_VIDEO } from './videoCrypt.mjs';

const SVGNS = 'http://www.w3.org/2000/svg';

// ── 阵营指针样式（hex 允许） ──
const FACTION_POINTER = {
  coalition: { color: '#4fc3f7', dash: '6,4', lock: 'diamond' },
  crimson:   { color: '#ff4444', dash: '2,3', lock: 'diamond' },
  psion:     { color: '#b06bff', dash: '0',   lock: 'spiral' },
  neutral:   { color: '#cccccc', dash: '4,4', lock: 'diamond' },
};
function factionPointerStyle(faction) {
  return FACTION_POINTER[faction] || FACTION_POINTER.neutral;
}

// ── 战术牌施放表现注册表 ──
// resolveVisual: 'phase'|'summon'|'draw'|'buff-econ'|'bomb'|'shield'|'arc'|'nuke'|'control'|'berserk'|'mutate'|'generic'
// warnScope: 'enemy'|'ally'|'all'|null（相对施法者）
const SPELL_PRESENTATION = {
  phaseshift_spell: { faction: 'coalition', pointer: true,  lock: 'diamond', resolveVisual: 'phase',      shakeTier: null,      lockSound: 'lock_coalition', hitSound: 'hit_coalition' },
  airborne:         { faction: 'coalition', pointer: false, warnScope: 'ally',  resolveVisual: 'summon',    shakeTier: 'light',   castSound: 'cast_boom' },
  satellite:        { faction: 'coalition', pointer: false, warnScope: null,    resolveVisual: 'draw',      shakeTier: null },
  industrial:       { faction: 'coalition', pointer: false, warnScope: null,    resolveVisual: 'buff-econ', shakeTier: null },
  mad_bomb:         { faction: 'crimson',   pointer: true,  lock: 'diamond', resolveVisual: 'bomb',       shakeTier: 'strong',  lockSound: 'lock_crimson',  hitSound: 'hit_crimson', countdown: true },
  aegis_field:      { faction: 'crimson',   pointer: true,  lock: 'shield',  resolveVisual: 'shield',     shakeTier: null,      lockSound: 'lock_crimson',  hitSound: 'hit_crimson' },
  arc_overload:     { faction: 'crimson',   pointer: false, warnScope: 'enemy', resolveVisual: 'arc',       shakeTier: 'medium',  castSound: 'cast_boom' },
  nuke:             { faction: 'crimson',   pointer: false, warnScope: 'all',   resolveVisual: 'nuke',      shakeTier: 'extreme', nukeSequence: true },
  psi_control:      { faction: 'psion',     pointer: true,  lock: 'spiral',  resolveVisual: 'control',    shakeTier: null,      lockSound: 'lock_psion',    hitSound: 'hit_psion' },
  berserk:          { faction: 'psion',     pointer: true,  lock: 'spiral',  resolveVisual: 'berserk',    shakeTier: null,      lockSound: 'lock_psion',    hitSound: 'hit_psion' },
  gene_mut:         { faction: 'psion',     pointer: false, warnScope: 'all',   resolveVisual: 'mutate',    shakeTier: 'medium',  castSound: 'cast_boom' },
  weather:          { faction: 'coalition', pointer: false, warnScope: 'enemy', resolveVisual: 'arc',       shakeTier: 'medium',  castSound: 'cast_boom' },
  war_cry:          { faction: 'neutral',   pointer: false, warnScope: 'ally',  resolveVisual: 'generic',   shakeTier: 'light' },
};
function getPresentation(cardId, card) {
  const base = SPELL_PRESENTATION[cardId];
  if (base) return base;
  const targeted = !!(card && card.needsTarget);
  const faction = (card && card.faction) || 'neutral';
  return {
    faction,
    pointer: targeted,
    lock: 'diamond',
    warnScope: targeted ? null : 'enemy',
    resolveVisual: 'generic',
    shakeTier: 'light',
    lockSound: 'lock_' + (faction === 'neutral' ? 'coalition' : faction),
    hitSound: 'hit_' + (faction === 'neutral' ? 'coalition' : faction),
    castSound: 'cast_boom',
  };
}

// 起点/终点/抬升比例 → 三次贝塞尔两控制点（向上抬起形成弧线）
function bezierPoints(from, to, liftRatio = 0.3) {
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const dist = Math.hypot(to.x - from.x, to.y - from.y);
  const lift = dist * liftRatio;
  return {
    c1: { x: from.x + (midX - from.x) * 0.5, y: from.y + (midY - from.y) * 0.5 - lift },
    c2: { x: to.x + (midX - to.x) * 0.5,     y: to.y + (midY - to.y) * 0.5 - lift },
  };
}

// ── 声音目录：事件名 → SoundFX descriptor（迁自 crimson soundFX.js 各 playXxx 参数）──
const SOUND_CATALOG = {
  card_play:      { kind: 'tone', freq: 440, duration: 0.1, wave: 'sine' },
  attack:         { kind: 'tone', freq: 220, duration: 0.15, wave: 'sawtooth' },
  attack_base:    { kind: 'tone', freq: 150, duration: 0.2, wave: 'square' },
  death:          { kind: 'tone', freq: 110, duration: 0.3, wave: 'triangle' },
  explosion:      { kind: 'noise', duration: 0.5, filterType: 'lowpass', filterFreq: 400, gain: 0.5, decayPow: 2 },
  lightning:      { kind: 'sequence', steps: [
                      { kind: 'tone', freq: 2000, duration: 0.05, wave: 'sawtooth', delay: 0 },
                      { kind: 'tone', freq: 1000, duration: 0.1, wave: 'sawtooth', delay: 50 },
                    ] },
  mind_control:   { kind: 'tone', freq: 200, duration: 0.5, wave: 'sine', sweepTo: 800, gain: 0.2 },
  freeze:         { kind: 'vibrato', freq: 1200, lfoFreq: 20, lfoDepth: 200, duration: 0.4, wave: 'sine', gain: 0.2 },
  heal:           { kind: 'tone', freq: 660, duration: 0.2, wave: 'sine', sweep: true },
  hero_power:     { kind: 'tone', freq: 880, duration: 0.3, wave: 'sine' },
  turn_start:     { kind: 'tone', freq: 330, duration: 0.15, wave: 'sine' },
  victory:        { kind: 'sequence', steps: [523, 659, 784, 1047].map((freq, i) => ({ kind: 'tone', freq, duration: 0.2, wave: 'sine', delay: i * 150 })) },
  defeat:         { kind: 'sequence', steps: [400, 350, 300, 200].map((freq, i) => ({ kind: 'tone', freq, duration: 0.3, wave: 'triangle', delay: i * 200 })) },
  lock_coalition: { kind: 'tone', freq: 1400, duration: 0.18, wave: 'sine' },
  lock_crimson:   { kind: 'noise', duration: 0.15, filterType: 'highpass', filterFreq: 1800, gain: 0.3, decayPow: 1.5 },
  lock_psion:     { kind: 'vibrato', freq: 90, lfoFreq: 6, lfoDepth: 15, duration: 0.35, wave: 'sine', gain: 0.18 },
  hit_coalition:  { kind: 'tone', freq: 1800, duration: 0.08, wave: 'triangle' },
  hit_crimson:    { kind: 'noise', duration: 0.5, filterType: 'lowpass', filterFreq: 400, gain: 0.5, decayPow: 2 },
  hit_psion:      { kind: 'tone', freq: 180, duration: 0.25, wave: 'sine' },
  cast_boom:      { kind: 'tone', freq: 220, duration: 0.5, wave: 'sine', sweepTo: 55, gain: 0.35 },
  nuke_heartbeat: { kind: 'sequence', steps: [0, 350, 600].map((delay) => ({ kind: 'tone', freq: 70, duration: 0.12, wave: 'square', delay })) },
  hit_stop_clink: { kind: 'tone', freq: 2600, duration: 0.04, wave: 'square' },
};

function getAssetPath(rel) {
  const api = (typeof window !== 'undefined') ? window.electronAPI : null;
  if (api && api.appRoot) {
    return api.appRoot + rel;
  }
  return rel;
}

async function loadBlobUrl(cardId) {
  const file = SPELL_VIDEO[cardId];
  if (!file) return null;
  const rel = `/card-games/crimsonfront/config/assets/videos/${file}`;
  const api = (typeof window !== 'undefined') ? window.electronAPI : null;
  let buf;
  if (api && typeof api.readAsset === 'function') {
    buf = await api.readAsset(rel);
  } else {
    const res = await fetch(getAssetPath(rel));
    if (!res.ok) throw new Error('fetch failed: ' + res.status);
    buf = await res.arrayBuffer();
  }
  const dec = xorBytes(new Uint8Array(buf), VIDEO_XOR_KEY);
  return URL.createObjectURL(new Blob([dec], { type: 'video/mp4' }));
}
export { xorBytes, loadBlobUrl };

export function createBattleFx(services) {
  const { particles, sound, getRects, reducedMotion } = services;
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));
  const sfx = (name) => { const d = SOUND_CATALOG[name]; if (d) sound.play(d); };

  const layer = () => particles.container;
  function containerSize() {
    const c = layer();
    return c ? { w: c.clientWidth, h: c.clientHeight } : { w: (typeof window !== 'undefined' ? window.innerWidth : 0), h: (typeof window !== 'undefined' ? window.innerHeight : 0) };
  }
  // 任意 DOM 元素中心 → 相对 particle-layer 坐标
  function centerOf(el) {
    const c = layer();
    if (!el || !c) return null;
    const cr = c.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width / 2 - cr.left, y: r.top + r.height / 2 - cr.top };
  }
  function mount(el) { const c = layer(); if (c) c.appendChild(el); return el; }

  // ── 前摇 ──
  async function pointerWindup(pres, sourceEl, targetId) {
    const style = factionPointerStyle(pres.faction);
    const size = containerSize();
    const from = centerOf(sourceEl) || { x: size.w / 2, y: size.h };
    const to = getRects(targetId) || { x: size.w / 2, y: size.h / 2 };

    // 贝塞尔光缆
    const svg = document.createElementNS(SVGNS, 'svg');
    svg.setAttribute('class', 'cf-spellfx cf-spellfx-pointer');
    const path = document.createElementNS(SVGNS, 'path');
    const { c1, c2 } = bezierPoints(from, to, 0.3);
    path.setAttribute('d', `M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`);
    path.setAttribute('class', 'cf-cable');
    path.setAttribute('stroke', style.color);
    path.style.color = style.color;
    if (style.dash && style.dash !== '0') path.setAttribute('stroke-dasharray', style.dash);
    svg.appendChild(path);
    mount(svg);

    // 锁定水晶
    const crystal = document.createElement('div');
    crystal.className = 'cf-lock-crystal' + (pres.lock === 'spiral' ? ' cf-lock-spiral' : pres.lock === 'shield' ? ' cf-lock-shield' : '');
    crystal.style.left = `${to.x}px`;
    crystal.style.top = `${to.y}px`;
    crystal.style.color = style.color;
    mount(crystal);

    if (pres.lockSound) sfx(pres.lockSound);
    if (pres.countdown) await bombCountRing(to);
    await delay(500);
    svg.remove();
    crystal.remove();
  }

  async function areaWindup(pres, casterIndex) {
    if (pres.castSound) sfx(pres.castSound);
    const scope = pres.warnScope;
    if (!scope) { await delay(120); return; } // 瞬发（satellite/industrial）
    const targets = scope === 'enemy' ? [`field:${1 - casterIndex}`]
      : scope === 'ally' ? [`field:${casterIndex}`]
      : ['field:0', 'field:1'];
    const els = [];
    for (const t of targets) {
      const r = getRects(t);
      if (!r) continue;
      const e = document.createElement('div');
      e.className = 'cf-warning-ellipse' + (scope === 'ally' ? ' cf-warn-ally' : '');
      e.style.left = `${r.x}px`;
      e.style.top = `${r.y}px`;
      e.style.width = `${r.w * 1.05}px`;
      e.style.height = `${r.h * 1.2}px`;
      mount(e);
      els.push(e);
    }
    await delay(600);
    for (const e of els) e.remove();
  }

  async function nukeWindup() {
    const veil = document.createElement('div');
    veil.className = 'cf-spellfx cf-nuke-veil';
    mount(veil);
    sfx('nuke_heartbeat');
    for (const n of ['3', '2', '1']) {
      const c = document.createElement('div');
      c.className = 'cf-nuke-count';
      c.textContent = n;
      veil.appendChild(c);
      await delay(350);
      c.remove();
    }
    veil.remove();
  }

  async function bombCountRing(pos) {
    const r = document.createElement('div');
    r.className = 'cf-bomb-count-ring';
    r.style.left = `${pos.x}px`;
    r.style.top = `${pos.y}px`;
    mount(r);
    await delay(400);
    r.remove();
  }

  // ── 结算演出（在旧 DOM 上放粒子；render() 尚未调用）──
  function resolveVisual(pres, facts, targetId, casterIndex) {
    const fc = factionPointerStyle(pres.faction).color;
    const minionDamages = facts.damages.filter((d) => !String(d.target).startsWith('base:'));
    const baseDamages = facts.damages.filter((d) => String(d.target).startsWith('base:'));

    // 受伤随从：按旧棋位放粒子 + 伤害数字
    for (const d of minionDamages) {
      const p = getRects(d.target);
      if (!p) continue;
      if (pres.resolveVisual === 'arc') particles.arcLightning(p.x, p.y - 40, p.x, p.y, { color: fc });
      else particles.aoeExplosion(p.x, p.y, pres.resolveVisual === 'nuke' ? 100 : 60, { color: fc });
      particles.damageNumber(p.x, p.y, d.amount, { color: 'var(--danger)' });
    }
    // 致死随从：额外爆点（死亡淡出由 render 处理）
    for (const dead of facts.deaths) {
      const p = getRects(dead.id);
      if (p) particles.aoeExplosion(p.x, p.y, 70, { color: fc });
    }
    // 基地伤害数字
    for (const b of baseDamages) {
      const p = getRects(b.target);
      if (p) particles.damageNumber(p.x, p.y, b.amount, { color: 'var(--danger)' });
    }
    // 治疗
    for (const h of facts.heals) {
      const p = getRects(h.target);
      if (p) particles.heal(p.x, p.y, { color: 'var(--ok)' });
    }
    // 控制转移：心灵波
    for (const c of facts.controlSwitched) {
      const p = getRects(c.id);
      if (p) particles.mindControlWave(p.x, p.y, p.x, p.y, { color: FACTION_POINTER.psion.color });
    }
    // 增益（狂暴/无敌/基因突变）：轮廓闪光
    if (pres.resolveVisual === 'berserk' || pres.resolveVisual === 'shield' || pres.resolveVisual === 'mutate') {
      const ids = facts.buffs.length ? facts.buffs.map((b) => b.id)
        : minionDamages.length ? minionDamages.map((d) => d.target)
        : (targetId ? [targetId] : []);
      for (const id of ids) buffOutline(id, pres.resolveVisual === 'shield');
    }
    // 召唤（空降）：施法者半场落光柱
    if (pres.resolveVisual === 'summon') {
      const mine = facts.summons.filter((s) => s.side === casterIndex);
      if (mine.length) summonPillars(casterIndex, mine.length);
    }
    // 抽牌（卫星）：N 张牌背飞入手牌
    const myDraw = facts.draws.find((d) => d.side === casterIndex);
    if (myDraw && myDraw.count > 0) drawFlyers(myDraw.count);
  }

  function buffOutline(minionId, isShield) {
    const r = getRects(minionId);
    if (!r) return;
    const o = document.createElement('div');
    o.className = 'cf-buff-outline' + (isShield ? ' cf-shield-outline' : '');
    o.style.left = `${r.x - r.w / 2}px`;
    o.style.top = `${r.y - r.h / 2}px`;
    o.style.width = `${r.w}px`;
    o.style.height = `${r.h}px`;
    mount(o);
    setTimeout(() => o.remove(), 600);
  }

  function summonPillars(casterIndex, count) {
    const r = getRects(`field:${casterIndex}`);
    if (!r) return;
    const left = r.x - r.w / 2;
    const top = r.y - r.h / 2;
    for (let i = 0; i < count; i++) {
      const pil = document.createElement('div');
      pil.className = 'cf-summon-pillar';
      pil.style.left = `${left + (r.w * (i + 1)) / (count + 1)}px`;
      pil.style.top = `${top}px`;
      pil.style.height = `${r.h}px`;
      mount(pil);
      setTimeout(() => pil.remove(), 520);
    }
  }

  function drawFlyers(count) {
    const hand = getRects('hand');
    const size = containerSize();
    const to = hand || { x: size.w / 2, y: size.h - 40 };
    for (let i = 0; i < count; i++) {
      const f = document.createElement('div');
      f.className = 'cf-draw-flyer';
      f.style.left = `${size.w - 40}px`;
      f.style.top = `20px`;
      mount(f);
      requestAnimationFrame(() => {
        f.style.left = `${to.x}px`;
        f.style.top = `${to.y}px`;
        f.style.opacity = '0.2';
      });
      setTimeout(() => f.remove(), 520);
    }
  }

  async function hitStop(ms = 150) {
    sfx('hit_stop_clink');
    const flash = document.createElement('div');
    flash.className = 'cf-spellfx cf-hitstop-flash';
    mount(flash);
    await delay(ms);
    flash.remove();
  }

  return {
    async playAttack({ attackerEl, targetEl, applyFn, computeFacts, render }) {
      sfx('attack');
      await playAttackAnimation({ attackerEl, targetEl, reducedMotion, onHit: applyFn });
      const facts = computeFacts();
      const minionDamages = facts.damages.filter((d) => !String(d.target).startsWith('base:'));
      for (const d of facts.damages) {
        const p = getRects(d.target);
        if (p) particles.damageNumber(p.x, p.y, d.amount, { color: 'var(--danger)' });
      }
      for (const dead of facts.deaths) {
        const p = getRects(dead.id);
        if (p) particles.aoeExplosion(p.x, p.y, 60, { color: FACTION_POINTER.crimson.color });
      }
      if (facts.deaths.length) sfx('death');
      const hasImpact = minionDamages.length > 0 || facts.deaths.length > 0 || facts.damages.some((d) => String(d.target).startsWith('base:'));
      if (!reducedMotion && hasImpact) particles.screenShakeTier('light');
      render();
    },

    async playSpell({ cardId, card, casterIndex = 0, sourceEl, targetId, applyFn, computeFacts, render }) {
      sfx('card_play');

      // 非法术（随从/建筑）：无施法分镜，直接落地 + 轻结算（战吼伤害/治疗/召唤光柱）
      if (card && card.type && card.type !== 'spell') {
        applyFn();
        const facts = computeFacts();
        resolveVisual({ faction: card.faction || 'neutral', resolveVisual: 'summon' }, facts, targetId, casterIndex);
        if (!reducedMotion && (facts.damages.length || facts.deaths.length)) particles.screenShakeTier('light');
        render();
        return;
      }

      const pres = getPresentation(cardId, card);

      // 视频卡：预渲染视频完全替换程序化表现（失败/reducedMotion 降级到程序化）
      if (SPELL_VIDEO[cardId] && !reducedMotion) {
        const played = await playVideoOverlay({
          cardId,
          loadBlobUrl,
          skipHintText: '点击或按任意键跳过',
          onUnderlay: () => { applyFn(); render(); },
        });
        if (played) return;
        // 未播放（无 url/失败）：applyFn 尚未执行，继续程序化
      }

      // 1. 前摇
      if (pres.nukeSequence) await nukeWindup();
      else if (pres.pointer && targetId) await pointerWindup(pres, sourceEl, targetId);
      else await areaWindup(pres, casterIndex);

      // 2. 落地
      applyFn();
      const facts = computeFacts();

      // 3. 结算演出（旧 DOM 上）
      resolveVisual(pres, facts, targetId, casterIndex);
      if (pres.hitSound && targetId) sfx(pres.hitSound);

      // 4. 震屏 + hit-stop
      if (pres.shakeTier) particles.screenShakeTier(pres.shakeTier);
      const hasImpact = facts.damages.length > 0 || facts.deaths.length > 0;
      if (hasImpact && !reducedMotion) await hitStop(150);

      // 5. 重绘
      render();
    },

    sfxFor(event) {
      return SOUND_CATALOG[event] || null;
    },
  };
}
