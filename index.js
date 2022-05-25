const socketCallbacks = require('./socketCallback.js')

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
server.listen(1080)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('Client connected')
    socketCallbacks.initEvents(socket, io)
});