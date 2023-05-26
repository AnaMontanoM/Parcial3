const express = require('express');
const http = require('http');
const socketID = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('message', (message) => {
        console.log('Nuevo mensaje:', message);
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

server.listen(4000, () => {
    console.log('Servidor escuchando en el puerto 4000');
});