const meta = require('./meta');
const cards = require('./cards');
const rules = require('./rules');
const { registerAllEffects } = require('./effects');

module.exports = {
  meta,
  cards,                      // { allCards, getCardById, ... }
  rules,                      // { flags, hooks }
  registerEffects: registerAllEffects, // (registry) => void
};
