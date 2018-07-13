const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v1');
const PORT = 3001;
const server = express()

  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws, req) => {

  /* Generates a color for each user according to the number of clients, returns a message to send to the client in order to set current user color state */
  const generateRandomColor = (num) => {
    let colors = [
      '#cc6886', //pink
      '#6c7789', //grey
      '#c95656', //red
      '#62ba79', //green
      '#5f89cc', //blue
      '#624ead', //purple
    ];

    let color = colors[colors.length - num];

    const outgoingMsg = {
      type: 'nameColor',
      color: color
    }

    return outgoingMsg;
  }

  /* Send each new connection a color for them to use in their state */
  ws.send(JSON.stringify(generateRandomColor(wss.clients.size)));

  /* All connected sockets */
  let connections = {
    type: 'users',
    data: wss.clients.size
  }

  wss.clients.forEach((client) => {
    client.send(JSON.stringify(connections));
  })

  /* When receiving a message, unpack it, add an ID, and send it back to each client */
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
  })

  ws.on('close', () => console.log('Client disconnected'));
});
