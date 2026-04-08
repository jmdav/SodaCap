const { WebSocketServer, WebSocket } = require('ws');

function peerProxy(httpServer) {
  const socketServer = new WebSocketServer({ server: httpServer });

  const scores = {};

  socketServer.on('connection', (socket) => {
    socket.isAlive = true;
    socket.username = null;

    socket.on('message', function message(data) {
      try {
        const scoreObject = JSON.parse(data);
        if (scoreObject.username && scoreObject.score !== undefined) {
          socket.username = scoreObject.username;
          scores[socket.username] = scoreObject.score;
        }
      } catch (e) {
        console.error("Invalid JSON");
      }
    });

    socket.on('pong', () => {
      socket.isAlive = true;
    });

    socket.on('close', () => {
      if (socket.username) {
        delete scores[socket.username];
      }
    });

  });

  //Leaderboard update
  setInterval(() => {
    const payload = JSON.stringify(scores);
    socketServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
  }, 100);

  //Heartbeat
  setInterval(() => {
    socketServer.clients.forEach(function each(client) {
      if (client.isAlive === false) return client.terminate();
      client.isAlive = false;
      client.ping();
    });
  }, 30000);

  socketServer.on('close', function close() {
    clearInterval(interval);
  });

}

module.exports = { peerProxy };
