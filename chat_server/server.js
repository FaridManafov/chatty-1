const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v1');
const PORT = 3001;
const server = express()

  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws, req) => {
  /*Generates a random color and returns a message to send to the client */
  const generateRandomColor = () => {
    const colors = [
      '#5f89cc', //blue
      '#624ead', //purple
      '#62ba79', //green
      '#c95656', //red
    ];

    const outgoingMsg = {
      type: 'nameColor',
      color: colors[Math.floor(Math.random() * 5)]
    }

    return outgoingMsg;
  }

  /* Send each new connection a color for them to use in their state */
  ws.send(JSON.stringify(generateRandomColor()));

  /* All connected sockets */
  let connections = {
    type: 'users',
    data: wss.clients.size
  }

  wss.clients.forEach((client) => {
    client.send(JSON.stringify(connections));
  })

  /* When receiving a message, unpack it, add an ID, and send it back to client */
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
