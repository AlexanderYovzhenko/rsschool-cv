const e = require("express");
const express = require("express");
const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get('/', (req, res) => {
	res.render('index')
});

server = app.listen("3000", () => console.log("Server is running..."));

const io = require("socket.io")(server);

const arrayMessages = [];
let roomUsers;

io.on('connection', (socket) => {
	console.log('New user connected')

    socket.on('create', function(room) {
      room == '' ? roomUsers = '1000': roomUsers = room;
      socket.join(roomUsers);
    });

	socket.username = "Anonymous";

    socket.on('change_username', (data) => {
        socket.username = data.username
    });

    socket.on('new_message', (data) => {
        arrayMessages.push(`${socket.username}: ${data.message} `);
        if(roomUsers === '1000') {
            io.sockets.emit('add_mess', {arrayMessages, message : data.message, username : socket.username, className : data.className});
        } else {
            io.sockets.to(roomUsers).emit('add_mess', {arrayMessages, message : data.message, username : socket.username, className : data.className});
        }
    console.log(socket.adapter.rooms)
    });

    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    });
});
