// server.js
const SocketServer =require('ws').Server;
const express = require('express');
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');


// Set the port to 3001
const PORT = 3001;

// Creates the express server
const server = express()

// declares that static assets (html, javascript, css) are in the  /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Creates the WebSockets server
const wss = new SocketServer({ server });



//Broadcasts posts to call clients connected to server
wss.broadcast = function (data) {
  wss.clients.forEach(function(client) {
    if (client.readyState === client.OPEN) {
      client.send(data);
    }
  })
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  let  newConnect = {
    type: "incomingConnectNotification",
    id: uuidv4(),

    content: "New User Has Arrived!"
   }
   console.log(newConnect);
  // console.log('Client connected');
 let userConnect = JSON.stringify(newConnect)
 wss.broadcast(userConnect);


  let clients = {
    type: "newSize",
    size: wss.clients.size
  }
  let clientSize = JSON.stringify(clients)

  wss.broadcast(clientSize)

    ws.on('message', function incoming(message) {
    messageX = JSON.parse(message)

    if (messageX.type === "postMessage") {
      messageX.id = uuidv4()
      messageX.type = "incomingMessage"


      message = JSON.stringify(messageX)

wss.broadcast(message)

    } else if (messageX.type === "postNotification") {
      messageX.type = "incomingNotification"
      messageX.id = uuidv4()


      message = JSON.stringify(messageX)


      wss.broadcast(message)
    }
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', (ws) => {
    wss.broadcast(clientSize)
    console.log("Client disconnected")
  });
})
