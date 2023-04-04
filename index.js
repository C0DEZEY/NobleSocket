const express = require('express')
const app = express()
const server = require('http').createServer(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  console.log('A new client Connected!');
  client.send("Connected to servers!");
  
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    const parsedMessage = JSON.parse(message);

    // Modify the message object if needed

    const stringifiedMessage = JSON.stringify(parsedMessage);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(stringifiedMessage);
      }
    });
  });
});


app.get('/', (req, res) => res.send('Hello World!'))

server.listen(8080, () => console.log(`Lisening on port :8080`))
