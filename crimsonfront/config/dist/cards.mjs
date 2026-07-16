

const allCards = [
  // ===== 同盟单位 (12) =====
  {
    id: 'rifleman', name: '步枪兵', faction: 'coalition', commander: null,
    type: 'minion', cost: 1, attack: 1, health: 2,
    tags: ['infantry'], keywords: ['battlecry'],
    techLevel: 1, text: '战吼：获得+1攻击力', rarity: 'common', needsTarget: false,
  },
  {
    id: 'jet_trooper', name: '喷射飞兵', faction: 'coalition', commander: null,
    type: 'minion', cost: 2, attack: 2, health: 1,
    tags: ['infantry'], keywords: ['windfury'],
    techLevel: 1, text: '风怒', rarity: 'common', needsTarget: false,
  },
  {
    id: 'phantom_tank', name: '蜃影坦克', faction: 'coalition', commander: null,
    type: 'minion', cost: 4, attack: 3, health: 3,
    tags: ['mechanic'], keywords: ['stealth'],
    techLevel: 2, text: '潜行', rarity: 'rare', needsTarget: false,
  },
  {
    id: 'beam_tank', name: '光束坦克', faction: 'coalition', commander: null,
    type: 'minion', cost: 6, attack: 5, health: 4,
    tags: ['mechanic'], keywords: ['refract'],
    techLevel: 3, text: '折射', rarity: 'epic', needsTarget: false,
  },
  {
    id: 'phase_legion', name: '相位军团兵', faction: 'coalition', commander: null,
    type: 'minion', cost: 3, attack: 2, health: 3,
    tags: ['infantry'], keywords: ['phase_shift'],
    techLevel: 2, text: '相位转移', rarity: 'rare', needsTarget: false,
  },
  {
    id: 'seal', name: '海豹部队', faction: 'coalition', commander: null,
    type: 'minion', cost: 4, attack: 4, health: 2,
    tags: ['infantry'], keywords: ['battlecry'],
    techLevel: 2, text: '战吼：消灭一个机械随从', rarity: 'rare', needsTarget: true,
  },
  {
    id: 'tank_destroyer', name: '坦克杀手', faction: 'coalition', commander: null,
    type: 'minion', cost: 3, attack: 2, health: 4,
    tags: ['mechanic'], keywords: ['anti_mech'],
    techLevel: 2, text: '反机械', rarity: 'common', needsTarget: false,
  },
  {
    id: 'battalion', name: '装甲堡垒', faction: 'coalition', commander: null,
    type: 'minion', cost: 7, attack: 5, health: 8,
    tags: ['mechanic'], keywords: ['aura'],
    techLevel: 3, text: '光环', rarity: 'epic', needsTarget: false,
  },
  {
    id: 'spy', name: '间谍', faction: 'coalition', commander: null,
    type: 'minion', cost: 4, attack: 1, health: 1,
    tags: ['infantry'], keywords: ['stealth'],
    techLevel: 2, text: '潜行', rarity: 'rare', needsTarget: false,
  },
  {
    id: 'sniper', name: '狙击手', faction: 'coalition', commander: 'britain',
    type: 'minion', cost: 3, attack: 4, health: 1,
    tags: ['infantry'], keywords: ['battlecry'],
    techLevel: 2, text: '战吼：消灭一个攻击力≤1的随从', rarity: 'rare', needsTarget: true,
  },
  {
    id: 'bastion_cannon', name: '要塞巨炮', faction: 'coalition', commander: 'france',
    type: 'minion', cost: 5, attack: 0, health: 5,
    tags: ['mechanic'], keywords: [],
    techLevel: 2, text: '', rarity: 'rare', needsTarget: false,
  },
  {
    id: 'weather', name: '气象风暴', faction: 'coalition', commander: null,
    type: 'spell', cost: 8, attack: undefined, health: undefined,
    tags: [], keywords: ['freeze', 'aoe'],
    techLevel: 3, text: '冻结所有敌方随从，造成3点AOE伤害', rarity: 'legendary', needsTarget: false,
  },

  // ===== 同盟战术 (4) =====
  {
    id: 'airborne', name: '空降部队', faction: 'coalition', commander: null,
    type: 'spell', cost: 3, attack: undefined, health: undefined,
    tags: [], keywords: ['summon'],
    techLevel: 1, text: '召唤三个1/1伞兵', rarity: 'common', needsTarget: false,
  },
  {
    id: 'phaseshift_spell', name: '相位传送', faction: 'coalition', commander: null,
    type: 'spell', cost: 6, attack: undefined, health: undefined,
    tags: [], keywords: ['phase_shift'],
    techLevel: 3, text: '相位传送一个随从', rarity: 'epic', needsTarget: true,
  },
  {
    id: 'satellite', name: '间谍卫星', faction: 'coalition', commander: null,
    type: 'spell', cost: 2, attack: undefined, health: undefined,
    tags: [], keywords: ['draw'],
    techLevel: 1, text: '抽2张牌', rarity: 'common', needsTarget: false,
  },
  {
    id: 'industrial', name: '工业时代', faction: 'coalition', commander: null,
    type: 'spell', cost: 5, attack: undefined, health: undefined,
    tags: [], keywords: ['discount'],
    techLevel: 2, text: '本回合所有卡牌费用-3', rarity: 'rare', needsTarget: false,
  },

  // ===== 赤潮单位 (12) =====
  {
    id: 'conscript', name: '动员兵', faction: 'crimson', commander: null,
    type: 'minion', cost: 1, attack: 1, health: 1,
    tags: ['infantry'], keywords: ['battlecry'],
    techLevel: 1, text: '战吼：召唤一个1/1动员兵', rarity: 'common', needsTarget: false,
  },
  {
    id: 'arc_trooper', name: '电弧步兵', faction: 'crimson', commander: null,
    type: 'minion', cost: 3, attack: 3, health: 3,
    tags: ['infantry'], keywords: ['arc'],
    techLevel: 2, text: '电弧', rarity: 'common', needsTarget: false,
  },
  {
    id: 'doom_tank', name: '末日坦克', faction: 'crimson', commander: null,
    type: 'minion', cost: 7, attack: 6, health: 8,
    tags: ['mechanic'], keywords: ['splash'],
    techLevel: 3, text: '溅射', rarity: 'epic', needsTarget: false,
  },
  {
    id: 'leviathan', name: '巨鲸飞艇', faction: 'crimson', commander: null,
    type: 'minion', cost: 8, attack: 6, health: 6,
    tags: ['mechanic'], keywords: ['charge_up'],
    techLevel: 3, text: '蓄力', rarity: 'legendary', needsTarget: false,
  },
  {
    id: 'mad_bomber', name: '疯狂炸弹客', faction: 'crimson', commander: null,
    type: 'minion', cost: 3, attack: 2, health: 2,
    tags: ['infantry'], keywords: ['battlecry'],
    techLevel: 2, text: '战吼：给一个随从装炸弹', rarity: 'rare', needsTarget: true,
  },
  {
    id: 'sabotage_drone', name: '破坏机器人', faction: 'crimson', commander: null,
    type: 'minion', cost: 2, attack: 1, health: 1,
    tags: ['mechanic'], keywords: ['stealth', 'anti_mech'],
    techLevel: 1, text: '潜行，反机械', rarity: 'rare', needsTarget: false,
  },
  {
    id: 'heavy_tank', name: '重型坦克', faction: 'crimson', commander: null,
    type: 'minion', cost: 4, attack: 4, health: 4,
    tags: ['mechanic'], keywords: [],
    techLevel: 2, text: '', rarity: 'common', needsTarget: false,
  },
  {
    id: 'rocket_truck', name: '火箭车', faction: 'crimson', commander: null,
    type: 'minion', cost: 5, attack: 2, health: 5,
    tags: ['mechanic'], keywords: [],
    techLevel: 2, text: '', rarity: 'rare', needsTarget: false,
  },
  {
    id: 'irradiator', name: '辐射兵', faction: 'crimson', commander: null,
    type: 'minion', cost: 5, attack: 4, health: 4,
    tags: ['infantry'], keywords: ['battlecry'],
    techLevel: 2, text: '战吼：消灭一个机械随从', rarity: 'rare', needsTarget: true,
  },
  {
    id: 'arc_tower', name: '电弧塔', faction: 'crimson', commander: null,
    type: 'minion', cost: 4, attack: 0, health: 5,
    tags: ['mechanic'], keywords: [],
    techLevel: 2, text: '', rarity: 'common', needsTarget: false,
  },
  {
    id: 'demo_truck', name: '自爆卡车', faction: 'crimson', commander: null,
    type: 'minion', cost: 4, attack: 4, health: 1,
    tags: ['mechanic'], keywords: ['deathrattle'],
    techLevel: 2, text: '亡语：对所有敌方随从造成3点伤害', rarity: 'rare', needsTarget: false,
  },
  {
    id: 'armored_harvester', name: '装甲矿车', faction: 'crimson', commander: null,
    type: 'minion', cost: 5, attack: 3, health: 5,
    tags: ['mechanic'], keywords: ['deathrattle'],
    techLevel: 2, text: '亡语：+2电力', rarity: 'rare', needsTarget: false,
  },

  // ===== 赤潮战术 (4) =====
  {
    id: 'mad_bomb', name: '定时炸弹', faction: 'crimson', commander: null,
    type: 'spell', cost: 2, attack: undefined, health: undefined,
    tags: [], keywords: [],
    techLevel: 1, text: '引爆炸弹', rarity: 'common', needsTarget: true,
  },
  {
    id: 'arc_overload', name: '电弧过载', faction: 'crimson', commander: null,
    type: 'spell', cost: 4, attack: undefined, health: undefined,
    tags: [], keywords: ['aoe'],
    techLevel: 2, text: '对所有敌方随从造成2点伤害', rarity: 'rare', needsTarget: false,
  },
  {
    id: 'aegis_field', name: '无敌力场', faction: 'crimson', commander: null,
    type: 'spell', cost: 6, attack: undefined, health: undefined,
    tags: [], keywords: ['invulnerable'],
    techLevel: 3, text: '使一个随从获得无敌', rarity: 'epic', needsTarget: true,
  },
  {
    id: 'nuke', name: '核弹', faction: 'crimson', commander: null,
    type: 'spell', cost: 8, attack: undefined, health: undefined,
    tags: [], keywords: ['aoe'],
    techLevel: 3, text: '对所有敌方随从造成5点伤害，对敌方基地造成5点伤害', rarity: 'legendary', needsTarget: false,
  },

  // ===== 灵能单位 (10) =====
  {
    id: 'psi_initiate', name: '灵能新兵', faction: 'psion', commander: null,
    type: 'minion', cost: 1, attack: 1, health: 2,
    tags: ['infantry'], keywords: ['battlecry'],
    techLevel: 1, text: '战吼：使一个敌方随从-1攻击力', rarity: 'common', needsTarget: true,
  },
  {
    id: 'savage', name: '狂暴巨兽', faction: 'psion', commander: null,
    type: 'minion', cost: 4, attack: 5, health: 4,
    tags: ['infantry'], keywords: ['spell_immune'],
    techLevel: 2, text: '法术免疫', rarity: 'rare', needsTarget: false,
  },
  {
    id: 'psi_master', name: '灵能操纵者', faction: 'psion', commander: null,
    type: 'minion', cost: 5, attack: 3, health: 4,
    tags: ['infantry'], keywords: ['battlecry'],
    techLevel: 2, text: '战吼：控制一个攻击力≤3的敌方随从', rarity: 'epic', needsTarget: true,
  },
  {
    id: 'mag_tank', name: '磁力坦克', faction: 'psion', commander: null,
    type: 'minion', cost: 4, attack: 3, health: 3,
    tags: ['mechanic'], keywords: ['battlecry'],
    techLevel: 2, text: '战吼：移动一个随从', rarity: 'rare', needsTarget: true,
  },
  {
    id: 'psi_clone', name: '灵能复制体', faction: 'psion', commander: null,
    type: 'minion', cost: 3, attack: 2, health: 3,
    tags: ['infantry'], keywords: ['deathrattle'],
    techLevel: 2, text: '亡语：召唤一个1/1灵能新兵', rarity: 'common', needsTarget: false,
  },
  {
    id: 'thunder_sub', name: '雷鸣潜艇', faction: 'psion', commander: null,
    type: 'minion', cost: 6, attack: 4, health: 5,
    tags: ['mechanic'], keywords: ['stealth', 'arc'],
    techLevel: 3, text: '潜行，电弧', rarity: 'epic', needsTarget: false,
  },
  {
    id: 'thrall_miner', name: '苦工矿场', faction: 'psion', commander: null,
    type: 'minion', cost: 3, attack: 0, health: 4,
    tags: ['mechanic'], keywords: ['power'],
    techLevel: 2, text: '+1电力', rarity: 'common', needsTarget: false,
  },
  {
    id: 'gene_mut', name: '基因突变', faction: 'psion', commander: null,
    type: 'spell', cost: 6, attack: undefined, health: undefined,
    tags: [], keywords: ['mutate'],
    techLevel: 3, text: '基因突变', rarity: 'epic', needsTarget: false,
  },
  {
    id: 'psi_tower', name: '灵能塔', faction: 'psion', commander: null,
    type: 'minion', cost: 5, attack: 0, health: 6,
    tags: ['mechanic'], keywords: ['mind_control_on_defend'],
    techLevel: 2, text: '防御时心灵控制', rarity: 'epic', needsTarget: false,
  },
  {
    id: 'psi_avatar', name: '灵能化身', faction: 'psion', commander: null,
    type: 'minion', cost: 8, attack: 4, health: 6,
    tags: ['infantry'], keywords: ['battlecry'],
    techLevel: 3, text: '战吼：永久控制一个敌方随从', rarity: 'legendary', needsTarget: true,
  },

  // ===== 灵能战术 (2) =====
  {
    id: 'psi_control', name: '灵能操控', faction: 'psion', commander: null,
    type: 'spell', cost: 5, attack: undefined, health: undefined,
    tags: [], keywords: ['mind_control'],
    techLevel: 2, text: '控制一个敌方随从', rarity: 'epic', needsTarget: true,
  },
  {
    id: 'berserk', name: '狂暴', faction: 'psion', commander: null,
    type: 'spell', cost: 2, attack: undefined, health: undefined,
    tags: [], keywords: ['berserk'],
    techLevel: 1, text: '使一个随从狂暴', rarity: 'common', needsTarget: true,
  },

  // ===== 建筑 (9) =====
  {
    id: 'barracks', name: '兵营', faction: 'neutral', commander: null,
    type: 'building', cost: 2, attack: undefined, health: 3,
    tags: [], keywords: [],
    techLevel: 1, text: '', rarity: 'common', needsTarget: false,
  },
  {
    id: 'war_factory', name: '战车工厂', faction: 'neutral', commander: null,
    type: 'building', cost: 3, attack: undefined, health: 4,
    tags: [], keywords: [],
    techLevel: 2, text: '', rarity: 'common', needsTarget: false,
  },
  {
    id: 'ore_refinery', name: '矿厂', faction: 'neutral', commander: null,
    type: 'building', cost: 3, attack: undefined, health: 3,
    tags: [], keywords: [],
    techLevel: 1, text: '', rarity: 'common', needsTarget: false,
  },
  {
    id: 'radar', name: '雷达', faction: 'neutral', commander: null,
    type: 'building', cost: 2, attack: undefined, health: 2,
    tags: [], keywords: [],
    techLevel: 1, text: '', rarity: 'common', needsTarget: false,
  },
  {
    id: 'repair', name: '修理厂', faction: 'neutral', commander: null,
    type: 'building', cost: 3, attack: undefined, health: 3,
    tags: [], keywords: [],
    techLevel: 2, text: '', rarity: 'common', needsTarget: false,
  },
  {
    id: 'battle_lab', name: '作战实验室', faction: 'neutral', commander: null,
    type: 'building', cost: 5, attack: undefined, health: 5,
    tags: [], keywords: [],
    techLevel: 3, text: '', rarity: 'rare', needsTarget: false,
  },
  {
    id: 'nuke_silo', name: '核弹发射井', faction: 'neutral', commander: null,
    type: 'building', cost: 8, attack: undefined, health: 2,
    tags: [], keywords: [],
    techLevel: 3, text: '', rarity: 'epic', needsTarget: false,
  },
  {
    id: 'aegis_device', name: '力场装置', faction: 'neutral', commander: null,
    type: 'building', cost: 6, attack: undefined, health: 3,
    tags: [], keywords: [],
    techLevel: 3, text: '', rarity: 'rare', needsTarget: false,
  },
  {
    id: 'psi_sensor', name: '灵能探测器', faction: 'neutral', commander: null,
    type: 'building', cost: 4, attack: undefined, health: 3,
    tags: [], keywords: [],
    techLevel: 2, text: '', rarity: 'common', needsTarget: false,
  },

  // ===== 中立 (3) =====
  {
    id: 'engineer', name: '工程师', faction: 'neutral', commander: null,
    type: 'minion', cost: 1, attack: 0, health: 2,
    tags: ['infantry'], keywords: ['battlecry'],
    techLevel: 1, text: '战吼：修复一个建筑', rarity: 'common', needsTarget: false,
  },
  {
    id: 'attack_dog', name: '警犬', faction: 'neutral', commander: null,
    type: 'minion', cost: 1, attack: 2, health: 1,
    tags: ['infantry'], keywords: ['battlecry'],
    techLevel: 1, text: '战吼：消灭一个攻击力≤1的随从', rarity: 'common', needsTarget: true,
  },
  {
    id: 'war_cry', name: '战争号令', faction: 'neutral', commander: null,
    type: 'spell', cost: 1, attack: undefined, health: undefined,
    tags: [], keywords: ['buff'],
    techLevel: 1, text: '全体友方随从+1攻击力', rarity: 'common', needsTarget: false,
  },
];

// Build a Map for fast lookup
const cardMap = new Map(allCards.map(c => [c.id, c]));

function getCardById(id) {
  return cardMap.get(id);
}

function getCardsByFaction(faction) {
  return allCards.filter(c => c.faction === faction || c.faction === 'neutral');
}

let instanceCounter = 0;

function validateDeck(cardIds) {
  const errors = [];
  if (!Array.isArray(cardIds)) {
    return { valid: false, errors: ['卡组数据无效'] };
  }
  if (cardIds.length !== 30) {
    errors.push(`卡组必须为 30 张（当前 ${cardIds.length} 张）`);
  }
  const counts = {};
  let buildings = 0;
  let superweapons = 0;
  for (const id of cardIds) {
    const card = cardMap.get(id);
    if (!card) {
      errors.push(`未知卡牌：${id}`);
      continue;
    }
    counts[id] = (counts[id] || 0) + 1;
    if (card.type === 'building') buildings++;
    if (card.type === 'spell' && card.rarity === 'legendary') superweapons++;
  }
  for (const [id, n] of Object.entries(counts)) {
    if (n > 2) errors.push(`同名卡牌不能超过 2 张：${id}（${n} 张）`);
  }
  if (buildings > 3) errors.push(`建筑卡不能超过 3 张（当前 ${buildings} 张）`);
  if (superweapons > 1) errors.push(`超级武器不能超过 1 张（当前 ${superweapons} 张）`);
  return { valid: errors.length === 0, errors };
}

function buildDeckFromCardIds(cardIds) {
  return cardIds.map(cardId => ({ id: `card_${instanceCounter++}`, cardId }));
}

export { allCards, getCardById, getCardsByFaction, buildDeckFromCardIds, validateDeck };