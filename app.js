const express = require('express');
const app = express();

const moment = require('moment');

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000 ;

const http = require('http').createServer(app);
const io = require('socket.io')(http);

//list of users connected 
let connectedUsers = [];

app.use(express.static('public'));

app.use(express.urlencoded({extended : true}));

app.get('/', (req, res) =>{
    res.sendFile( __dirname + '/public/html/');
});

app.post('/addUsername', (req, res) =>{
    console.log('it works !');
    res.send('hi !');
});

//executed for each user who connects to the server 
io.on('connection', (socket) => {
    //executed for each user who disconnects to the server 
    socket.on('disconnect', () => {
        //create an "chat message" type event for every users that say user disconnected
        io.emit('chat message', {
            msg : `${socket.username} disconnect`,
            position : 'center',
        });
        //delete username from users connected list
        connectedUsers = connectedUsers.filter(e => e !== socket.username);
    });
    //executed for each form submit 
    socket.on('chat message', (msg) => {
        io.emit('chat message', {
            msg,
            username : socket.username,
            position : 'left',
            time : moment().format('LT'),
        });
    });
    //custom event 
    socket.on('createUser', (username) =>{
        //create a property username for each socket(user)
        socket.username = username;
        //add username to users connected list
        connectedUsers.push(socket.username);
        //create an "chat message" type event for every users that say user connected
        io.emit('chat message', {
            msg : `${socket.username} connects`,
            position : 'center',
        });                
    });
    socket.on('getConnectedUsersList', () =>{
        console.log(connectedUsers);
        //send the connected user list to client side 
        socket.emit('sendConnectedUsersList', connectedUsers); 
    });
    socket.on('userIsTyping', () =>{
        console.log(`${socket.username} is typing`);
    });
});

http.listen(PORT);
