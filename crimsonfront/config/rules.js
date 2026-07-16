module.exports = {
  flags: {
    baseHealth: 20,
    maxPower: 10,
    maxTurns: 50,
    startHand: 3,
    startPower: 0,              // 原 createGame: opts.startPower || 0；MAIN 阶段才置 1
    attackRule: 'taunt',  // 有嘲讽先打嘲讽，否则可打脸
    deathTiming: 'attack-only', // 仅在 handleAttack 内结算死亡
    hasRarity: true,
  },
  hooks: {
    // barracks 步兵费用 -1；返回 undefined = 用框架默认 baseCost
    getEffectiveCost(state, player, cardDef, baseCost) {
      if (
        player.building &&
        player.building.cardId === 'barracks' &&
        cardDef.tags &&
        cardDef.tags.includes('infantry')
      ) {
        return Math.max(0, baseCost - 1);
      }
      return undefined;
    },
  },
};
