// 用法：node card-games/crimsonfront/server.js [port]
// 启动 crimsonfront 联网对战 WebSocket 服务器（默认端口 8099，与 theme.online.serverUrl 对应）。
const { loadGamePack } = require('../../framework/config/loadGamePack');
const engine = require('../../framework/engine/gameEngine');
const { startWSServer } = require('../../framework/network/wsServer');

function main() {
  const port = Number(process.argv[2]) || 8099;
  const pack = loadGamePack('crimsonfront');

  // enginePack：以真实 createGame(pack, config) 签名转发（server 已用 buildDeck 构建 deck 数组）。
  const enginePack = {
    createGame: (config) => engine.createGame(pack, config),
    processCommand: engine.processCommand,
    checkWinner: engine.checkWinner,
    buildDeck: pack.cards.buildDeckFromCardIds,
  };

  startWSServer(port, enginePack);
  console.log(`[server] ${pack.meta.id} online server listening on ws://localhost:${port}`);
}

main();
