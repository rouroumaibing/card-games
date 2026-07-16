import { getCardById } from './cards.mjs';

// ─── 辅助函数 ───

let _minionSeq = 0;

function summonMinion(state, playerIndex, cardId) {
  const player = state.players[playerIndex];
  if (player.field.length >= 6) return state;
  const cardDef = getCardById(cardId);
  const minion = {
    id: `minion_${Date.now()}_${_minionSeq++}`,
    cardId: cardId,
    attack: cardDef ? cardDef.attack : 1,
    health: cardDef ? cardDef.health : 1,
    maxHealth: cardDef ? cardDef.health : 1,
    canAttack: false,
    attacksLeft: 0,
    tags: cardDef ? cardDef.tags : [],
    keywords: cardDef ? cardDef.keywords : [],
    enchantments: [],
    bombTimer: null,
    controlledBy: null,
    frozen: false,
    ownerId: playerIndex,
  };
  player.field.push(minion);
  return state;
}

function findOwnerIndex(state, self) {
  for (let pi = 0; pi < 2; pi++) {
    if (state.players[pi].field.some(m => m.id === self.id)) return pi;
    if (state.players[pi].building && state.players[pi].building.id === self.id) return pi;
  }
  return self.ownerId != null ? self.ownerId : 0;
}

function findMinionById(state, targetId) {
  for (let pi = 0; pi < 2; pi++) {
    const minion = state.players[pi].field.find(m => m.id === targetId);
    if (minion) return { minion, playerIndex: pi };
  }
  return null;
}

// ─── 注册所有卡牌效果 ───

function registerAllEffects(registry) {

  // ===== 同盟单位 =====
  registry.register('rifleman', {
    battlecry: (state, self) => {
      self.attack += 1;
      return state;
    },
  });

  registry.register('jet_trooper', {
    // 风怒由 keywords 驱动，无需额外效果
  });

  registry.register('phantom_tank', {
    onTurnEnd: (state, self) => {
      if (!self.keywords.includes('stealth')) {
        self.keywords.push('stealth');
      }
      return state;
    },
  });

  registry.register('beam_tank', {
    onAttack: (state, self, context) => {
      if (!context || !context.targetId) return state;
      const targetInfo = findMinionById(state, context.targetId);
      if (!targetInfo) return state;
      const { minion: target, playerIndex: targetPI } = targetInfo;
      const overflow = Math.max(0, self.attack - target.health);
      if (overflow <= 0) return state;
      const splash = Math.max(1, Math.floor(overflow * 0.5));
      const field = state.players[targetPI].field;
      const idx = field.findIndex(m => m.id === target.id);
      if (idx > 0) field[idx - 1].health -= splash;
      if (idx < field.length - 1) field[idx + 1].health -= splash;
      return state;
    },
  });

  registry.register('phase_legion', {
    onAttack: (state, self, context) => {
      if (!context || !context.targetId) return state;
      const targetInfo = findMinionById(state, context.targetId);
      if (!targetInfo) return state;
      const { minion: target, playerIndex: targetPI } = targetInfo;
      state.players[targetPI].field = state.players[targetPI].field.filter(m => m.id !== target.id);
      state.players[targetPI].hand.push({ id: target.id, cardId: target.cardId });
      return state;
    },
  });

  registry.register('seal', {
    battlecry: (state, self, context) => {
      if (!context || !context.targetId) return state;
      const targetInfo = findMinionById(state, context.targetId);
      if (!targetInfo) return state;
      if (targetInfo.minion.tags.includes('mechanic')) {
        targetInfo.minion.health = 0;
      }
      return state;
    },
  });

  registry.register('tank_destroyer', {
    // 反机械由 keywords 驱动
  });

  registry.register('battalion', {
    onTurnStart: (state, self) => {
      const pi = findOwnerIndex(state, self);
      const field = state.players[pi].field;
      const idx = field.findIndex(m => m.id === self.id);
      if (idx < 0) return state;
      // Remove old aura enchantments from adjacent minions
      for (const minion of field) {
        minion.enchantments = minion.enchantments.filter(e => e.source !== self.id);
      }
      // Apply +1/+1 to adjacent minions
      if (idx > 0) {
        const left = field[idx - 1];
        left.attack += 1;
        left.health += 1;
        left.maxHealth += 1;
        left.enchantments.push({ type: 'battalion_aura', source: self.id, attack: 1, health: 1 });
      }
      if (idx < field.length - 1) {
        const right = field[idx + 1];
        right.attack += 1;
        right.health += 1;
        right.maxHealth += 1;
        right.enchantments.push({ type: 'battalion_aura', source: self.id, attack: 1, health: 1 });
      }
      return state;
    },
  });

  registry.register('spy', {
    battlecry: (state, self) => {
      const pi = findOwnerIndex(state, self);
      const opponent = 1 - pi;
      const oppHand = state.players[opponent].hand;
      if (oppHand.length === 0) return state;
      const randIdx = Math.floor(state.rng.next() * oppHand.length);
      const stolen = oppHand.splice(randIdx, 1)[0];
      state.players[pi].hand.push(stolen);
      return state;
    },
  });

  registry.register('sniper', {
    battlecry: (state, self, context) => {
      if (!context || !context.targetId) return state;
      const targetInfo = findMinionById(state, context.targetId);
      if (!targetInfo) return state;
      if (targetInfo.minion.attack <= 1) {
        targetInfo.minion.health = 0;
      }
      return state;
    },
  });

  registry.register('bastion_cannon', {
    onTurnEnd: (state, self) => {
      const pi = findOwnerIndex(state, self);
      const opponent = 1 - pi;
      const enemyField = state.players[opponent].field;
      if (enemyField.length === 0) return state;
      const target = enemyField[Math.floor(state.rng.next() * enemyField.length)];
      target.health -= 3;
      return state;
    },
  });

  // ===== 同盟战术 =====
  registry.register('airborne', {
    onPlay: (state) => {
      const cp = state.currentPlayer;
      summonMinion(state, cp, 'rifleman');
      summonMinion(state, cp, 'rifleman');
      summonMinion(state, cp, 'rifleman');
      return state;
    },
  });

  registry.register('phaseshift_spell', {
    onPlay: (state, self, context) => {
      if (!context || !context.targetId) return state;
      const targetInfo = findMinionById(state, context.targetId);
      if (!targetInfo) return state;
      const { minion: target } = targetInfo;
      target.canAttack = true;
      target.attacksLeft = target.keywords.includes('windfury') ? 2 : 1;
      return state;
    },
  });

  registry.register('satellite', {
    onPlay: (state) => {
      const player = state.players[state.currentPlayer];
      for (let i = 0; i < 2; i++) {
        if (player.deck.length > 0) {
          player.hand.push(player.deck.shift());
        }
      }
      return state;
    },
  });

  registry.register('industrial', {
    onPlay: (state) => {
      const cp = state.currentPlayer;
      state.players[cp].industrialDiscount = 3;
      return state;
    },
  });

  registry.register('weather', {
    onPlay: (state) => {
      const cp = state.currentPlayer;
      const opponent = 1 - cp;
      for (const minion of state.players[opponent].field) {
        minion.frozen = true;
        minion.health -= 3;
      }
      return state;
    },
  });

  // ===== 赤潮单位 =====
  registry.register('conscript', {
    battlecry: (state, self) => {
      summonMinion(state, state.currentPlayer, 'conscript');
      return state;
    },
  });

  registry.register('arc_trooper', {
    onAttack: (state, self) => {
      const pi = findOwnerIndex(state, self);
      const opponent = 1 - pi;
      state.players[opponent].baseHealth -= 1;
      return state;
    },
  });

  registry.register('doom_tank', {
    onAttack: (state, self, context) => {
      if (!context || !context.targetId) return state;
      const targetInfo = findMinionById(state, context.targetId);
      if (!targetInfo) return state;
      const { playerIndex: targetPI } = targetInfo;
      const field = state.players[targetPI].field;
      const idx = field.findIndex(m => m.id === context.targetId);
      if (idx > 0) field[idx - 1].health -= 1;
      if (idx < field.length - 1) field[idx + 1].health -= 1;
      return state;
    },
  });

  registry.register('leviathan', {
    onTurnEnd: (state, self) => {
      self.attack += 1;
      return state;
    },
  });

  registry.register('mad_bomber', {
    battlecry: (state, self, context) => {
      if (!context || !context.targetId) return state;
      const targetInfo = findMinionById(state, context.targetId);
      if (!targetInfo) return state;
      targetInfo.minion.bombTimer = { turnsLeft: 2, damage: 5 };
      return state;
    },
  });

  registry.register('sabotage_drone', {
    // 潜行+反机械由 keywords 驱动
  });

  registry.register('heavy_tank', {
    // 无特殊效果
  });

  registry.register('rocket_truck', {
    // 只能攻击基地 — 由 keywords 驱动
  });

  registry.register('irradiator', {
    battlecry: (state, self, context) => {
      if (!context || !context.targetId) return state;
      const targetInfo = findMinionById(state, context.targetId);
      if (!targetInfo) return state;
      if (targetInfo.minion.tags.includes('mechanic')) {
        targetInfo.minion.health = 0;
      }
      return state;
    },
  });

  registry.register('arc_tower', {
    onTurnEnd: (state, self) => {
      const pi = findOwnerIndex(state, self);
      const opponent = 1 - pi;
      const enemyField = state.players[opponent].field;
      if (enemyField.length === 0) return state;
      const target = enemyField[Math.floor(state.rng.next() * enemyField.length)];
      target.health -= 2;
      return state;
    },
  });

  registry.register('demo_truck', {
    deathrattle: (state, self) => {
      for (let pi = 0; pi < 2; pi++) {
        for (const minion of state.players[pi].field) {
          minion.health -= 3;
        }
      }
      return state;
    },
  });

  registry.register('armored_harvester', {
    deathrattle: (state, self) => {
      const pi = findOwnerIndex(state, self);
      state.players[pi].power += 2;
      return state;
    },
  });

  // ===== 赤潮战术 =====
  registry.register('mad_bomb', {
    onPlay: (state, self, context) => {
      if (!context || !context.targetId) return state;
      const targetInfo = findMinionById(state, context.targetId);
      if (!targetInfo) return state;
      targetInfo.minion.bombTimer = { turnsLeft: 3, damage: 6 };
      return state;
    },
  });

  registry.register('arc_overload', {
    onPlay: (state) => {
      const opponent = 1 - state.currentPlayer;
      for (const minion of state.players[opponent].field) {
        minion.health -= 2;
      }
      return state;
    },
  });

  registry.register('aegis_field', {
    onPlay: (state, self, context) => {
      if (!context || !context.targetId) return state;
      const targetInfo = findMinionById(state, context.targetId);
      if (!targetInfo) return state;
      targetInfo.minion.enchantments.push({ type: 'immune', duration: 1 });
      return state;
    },
  });

  registry.register('nuke', {
    onPlay: (state) => {
      const opponent = 1 - state.currentPlayer;
      for (const minion of state.players[opponent].field) {
        minion.health -= 5;
      }
      state.players[opponent].baseHealth -= 5;
      return state;
    },
  });

  // ===== 灵能单位 =====
  registry.register('psi_initiate', {
    battlecry: (state, self, context) => {
      if (!context || !context.targetId) return state;
      const targetInfo = findMinionById(state, context.targetId);
      if (!targetInfo) return state;
      targetInfo.minion.attack = Math.max(0, targetInfo.minion.attack - 1);
      return state;
    },
  });

  registry.register('savage', {
    // 法术免疫由 keywords 驱动
  });

  registry.register('psi_master', {
    battlecry: (state, self, context) => {
      if (!context || !context.targetId) return state;
      const targetInfo = findMinionById(state, context.targetId);
      if (!targetInfo) return state;
      const { minion: target, playerIndex: targetPI } = targetInfo;
      if (target.attack > 3) return state;
      const myPI = findOwnerIndex(state, self);
      if (state.players[myPI].field.length >= 6) return state;
      state.players[targetPI].field = state.players[targetPI].field.filter(m => m.id !== target.id);
      target.ownerId = myPI;
      target.controlledBy = myPI;
      state.players[myPI].field.push(target);
      return state;
    },
  });

  registry.register('mag_tank', {
    battlecry: (state, self, context) => {
      if (!context || !context.targetId) return state;
      const targetInfo = findMinionById(state, context.targetId);
      if (!targetInfo) return state;
      const { minion: target, playerIndex: targetPI } = targetInfo;
      const myPI = findOwnerIndex(state, self);
      if (state.players[myPI].field.length >= 6) return state;
      state.players[targetPI].field = state.players[targetPI].field.filter(m => m.id !== target.id);
      target.ownerId = myPI;
      target.controlledBy = myPI;
      state.players[myPI].field.push(target);
      return state;
    },
  });

  registry.register('psi_clone', {
    deathrattle: (state, self) => {
      const pi = findOwnerIndex(state, self);
      summonMinion(state, pi, 'psi_initiate');
      return state;
    },
  });

  registry.register('thunder_sub', {
    onAttack: (state, self) => {
      const pi = findOwnerIndex(state, self);
      const opponent = 1 - pi;
      state.players[opponent].baseHealth -= 2;
      return state;
    },
  });

  registry.register('thrall_miner', {
    onTurnStart: (state, self) => {
      const pi = findOwnerIndex(state, self);
      state.players[pi].power += 1;
      return state;
    },
  });

  registry.register('psi_tower', {
    // 嘲讽+防御时心灵控制 — 由 gameEngine 处理
  });

  registry.register('psi_avatar', {
    battlecry: (state, self, context) => {
      if (!context || !context.targetId) return state;
      const targetInfo = findMinionById(state, context.targetId);
      if (!targetInfo) return state;
      const { minion: target, playerIndex: targetPI } = targetInfo;
      const myPI = findOwnerIndex(state, self);
      if (state.players[myPI].field.length >= 6) return state;
      state.players[targetPI].field = state.players[targetPI].field.filter(m => m.id !== target.id);
      target.ownerId = myPI;
      target.controlledBy = 'permanent';
      state.players[myPI].field.push(target);
      return state;
    },
  });

  // ===== 灵能战术 =====
  registry.register('psi_control', {
    onPlay: (state, self, context) => {
      if (!context || !context.targetId) return state;
      const targetInfo = findMinionById(state, context.targetId);
      if (!targetInfo) return state;
      const { minion: target, playerIndex: targetPI } = targetInfo;
      if (target.attack > 3) return state;
      const cp = state.currentPlayer;
      if (state.players[cp].field.length >= 6) return state;
      state.players[targetPI].field = state.players[targetPI].field.filter(m => m.id !== target.id);
      target.ownerId = cp;
      target.controlledBy = cp;
      state.players[cp].field.push(target);
      return state;
    },
  });

  registry.register('berserk', {
    onPlay: (state, self, context) => {
      if (!context || !context.targetId) return state;
      const targetInfo = findMinionById(state, context.targetId);
      if (!targetInfo) return state;
      targetInfo.minion.attack += 3;
      targetInfo.minion.enchantments.push({ type: 'berserk', duration: 1 });
      return state;
    },
  });

  registry.register('gene_mut', {
    onPlay: (state) => {
      for (let pi = 0; pi < 2; pi++) {
        for (const minion of state.players[pi].field) {
          if (minion.attack <= 2) {
            minion.attack = 3;
            minion.health = 3;
            minion.maxHealth = 3;
          }
        }
      }
      return state;
    },
  });

  // ===== 建筑 =====
  registry.register('barracks', {
    onBuild: (state) => state,
  });

  registry.register('war_factory', {
    onTurnStart: (state, self) => {
      const pi = findOwnerIndex(state, self);
      summonMinion(state, pi, 'conscript');
      return state;
    },
  });

  registry.register('ore_refinery', {
    onTurnStart: (state, self) => {
      const pi = findOwnerIndex(state, self);
      state.players[pi].power += 1;
      return state;
    },
  });

  registry.register('radar', {
    onTurnStart: (state, self) => {
      const pi = findOwnerIndex(state, self);
      if (state.players[pi].deck.length > 0) {
        state.players[pi].hand.push(state.players[pi].deck.shift());
      }
      return state;
    },
  });

  registry.register('repair', {
    onTurnStart: (state, self) => {
      const pi = findOwnerIndex(state, self);
      const injured = state.players[pi].field.filter(m => m.health < m.maxHealth);
      if (injured.length === 0) return state;
      const target = injured[Math.floor(state.rng.next() * injured.length)];
      target.health = Math.min(target.maxHealth, target.health + 2);
      return state;
    },
  });

  registry.register('battle_lab', {
    onBuild: (state) => state,
  });

  registry.register('nuke_silo', {
    onTurnStart: (state, self) => {
      if (!self.chargeCounter) self.chargeCounter = 0;
      self.chargeCounter++;
      if (self.chargeCounter >= 3) {
        for (let pi = 0; pi < 2; pi++) {
          for (const minion of state.players[pi].field) {
            minion.health -= 10;
          }
        }
        self.chargeCounter = 0;
      }
      return state;
    },
  });

  registry.register('aegis_device', {
    onBuild: (state, self) => {
      const pi = findOwnerIndex(state, self);
      for (const minion of state.players[pi].field) {
        minion.enchantments.push({ type: 'immune', duration: 1 });
      }
      return state;
    },
  });

  registry.register('psi_sensor', {
    onBuild: (state) => state,
  });

  // ===== 中立 =====
  registry.register('attack_dog', {
    battlecry: (state, self, context) => {
      if (!context || !context.targetId) return state;
      const targetInfo = findMinionById(state, context.targetId);
      if (!targetInfo) return state;
      const { minion: target, playerIndex: targetPI } = targetInfo;
      const myPI = findOwnerIndex(state, self);
      if (targetPI === myPI) return state;
      if (target.attack <= 1) {
        target.health = 0;
      }
      return state;
    },
  });

  registry.register('engineer', {
    battlecry: (state, self) => {
      const pi = findOwnerIndex(state, self);
      const building = state.players[pi].building;
      if (building) {
        building.health = Math.min(building.maxHealth, building.health + 3);
      }
      return state;
    },
  });

  registry.register('war_cry', {
    onPlay: (state) => {
      const cp = state.currentPlayer;
      for (const minion of state.players[cp].field) {
        minion.attack += 1;
      }
      return state;
    },
  });
}

export { registerAllEffects };