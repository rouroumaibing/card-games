// 用法：node card-games/crimsonfront/run.js [seed]
const { loadGamePack } = require('../../framework/config/loadGamePack');
const { createGame, processCommand, runAITurn, checkWinner } = require('../../framework/engine/gameEngine');

function buildDeck(pack) {
  const ids = pack.cards.allCards.filter(c => c.type === 'minion').slice(0, 15).map(c => c.id);
  const cardIds = [];
  for (const id of ids) cardIds.push(id, id);
  return pack.cards.buildDeckFromCardIds(cardIds);
}

function main() {
  const seed = Number(process.argv[2]) || 2026;
  const pack = loadGamePack('crimsonfront');
  console.log(`[run] loaded pack: ${pack.meta.id} (${pack.meta.name})`);

  const deck = buildDeck(pack);
  let state = createGame(pack, { seed, player1: { deck }, player2: { deck } });
  state = processCommand(state, { type: 'MULLIGAN', cardIndices: [] });
  state = processCommand(state, { type: 'MULLIGAN', cardIndices: [] });

  let guard = 200;
  while (state.winner === null && guard-- > 0) {
    state = runAITurn(state, 'hard');
    if (state.winner !== null) break;
    const w = checkWinner(state);
    if (w !== null) { state.winner = w; break; }
  }

  console.log(`[run] finished: winner=${state.winner} turn=${state.turn} ` +
    `p0.base=${state.players[0].baseHealth} p1.base=${state.players[1].baseHealth}`);
  if (state.winner === null) { console.error('[run] ERROR: no winner within guard'); process.exit(1); }
  process.exit(0);
}

main();
