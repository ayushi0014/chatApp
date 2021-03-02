const express = require('express');
const app = express();
const socket = require('socket.io');
const { getCurrentUser, userJoin, userLeft} = require('./user');
const port = process.env.PORT || 5000;


var server = app.listen( port, () => {
    console.log(`Server is running at port ${port}`)
});

const io = socket(server);

io.on('connection', (socket) => {
    socket.on('joinRoom', ({username, roomname}) => {
        //create user
        const user = userJoin(socket.id, username, roomname);
        console.log(`id = ${socket.id}`);
        socket.join(user.room);

        //emit welcome message to user
        socket.emit('message', {
            userId: user.id,
            username: user.username,
            text: `Welcome ${user.username}`
        });

        //broadcast message to other users that a new user has joined
        socket.broadcast.to(user.room).emit('message', {
            userId: user.id,
            username: user.username,
            text: `${user.username} has joined the chat`
        });
    });

    socket.on('chat', (text) => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', {
            userId: user.id,
            username: user.username,
            text: text
        });
    });

    socket.on('disconnect', () => {
        const user = userLeft(socket.id);

        if(user) {
            io.to(user.room).emit('message', {
                userId: user.id,
                username: user.username,
                text: `${user.username} has left the chat`
            });
        }
    });
});