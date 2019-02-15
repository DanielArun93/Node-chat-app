const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');
var moment = require('moment');
var date = moment();
var { stringCheck } = require('./utils/validation');
const { generateMessage, generateLocationMessage } = require('./utils/message');
var { Users } = require('./utils/users');
const port = process.env.PORT || 3000;
var moment = require('moment');
var app = express();
var users = new Users();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("New user connected!");
    console.log('moment',moment().format('h:mm:ss a'));
    socket.on('join', (params, callback) => {
        if (!stringCheck(params.name) || !stringCheck(params.room)) {
            return callback("Name and Room name is required!...");
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUsers(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage(`Admin`, 'Welcome to Chat App'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage(`Admin`, `${params.name} joined the group`));
        callback();
    })
    //socket.to('dsfsdf').emit() -- only emit to particular room



    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);
        if(user && stringCheck(message.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name,message.text))
        }
        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     completedAt: date.format('h:mm a')
        // })
        callback();
    })

    socket.on('createLocationMessage', (data) => {
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, data.lat, data.long));

        }
    })

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room))
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left the group`));
        }
    })
})




server.listen(port, (err, res) => {
    if (err) {
        console.log(`Unable to connect to Port ${port}`);
    }
    else {
        console.log(`Server connected to the port ${port}`);
    }
})
