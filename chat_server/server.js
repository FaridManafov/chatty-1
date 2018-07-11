const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v1');
const PORT = 3001;
const server = express()

  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws, req) => {
  const address = req.connection.remoteAddress;
  console.log(`Client connected from ${address}`);

  ws.on('message', function incoming(data) {
    let newMessage = JSON.parse(data);
    newMessage.messageId = uuid();
    JSON.stringify(newMessage);

    console.log(newMessage);

    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(newMessage);
        console.log('sent');
      }
    })
  })


  ws.on('close', () => console.log('Client disconnected'));
});
