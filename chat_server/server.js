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

  const generateRandomColor = () => {
    const colors = [
      'red',
      'orange',
      'yellow',
      'green',
      'blue'
    ];

    const outgoingMsg = {
      type: 'nameColor',
      color: colors[Math.floor(Math.random() * 4)]
    }

    return outgoingMsg;
  }

  ws.send(JSON.stringify(generateRandomColor()));
  // client.send(JSON.stringify(generateRandomColor()));

  let connections = {
    type: 'users',
    data: wss.clients.size
  }

  wss.clients.forEach((client) => {
    client.send(JSON.stringify(connections));
  })

  ws.on('message', function incoming(data) {
    let newMessage = JSON.parse(data);
    if (newMessage.type === 'chat') {
      newMessage.messageId = uuid();
      wss.clients.forEach((client) => {
        client.send(JSON.stringify(newMessage));
      })
    } else if (newMessage.type === 'nameChange') {
      wss.clients.forEach((client) => {
        newMessage.messageId = uuid();
        client.send(JSON.stringify(newMessage))
      })
    }
    console.log(wss.clients.size); //works
  })

  ws.on('close', () => console.log('Client disconnected'));
});
