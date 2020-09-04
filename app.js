const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000 ;

const http = require('http').createServer(app);
const io = require('socket.io')(http);

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
    //create an "chat message" type event for every users that say user connected
    io.emit('chat message', {
        msg : 'user connected',
        position : 'center',
    });
    //executed for each user who disconnects to the server 
    socket.on('disconnect', () => {
        //create an "chat message" type event for every users that say user disconnected
        io.emit('chat message', {
            msg : 'user disconnected',
            position : 'center',
        });    
    });
    //executed for each form submit 
    socket.on('chat message', (msg,) => {
        io.emit('chat message', {
            msg,
            username : socket.username,
        });
    });
    //custom event 
    socket.on('createUser', (username) =>{
        console.log('new user : ' + username);
        //create a property username for each socket(user)
        socket.username = username;                
    });
    socket.on('userIsTyping', () =>{
        console.log(`${socket.username} is typing`);
    });
});

http.listen(PORT);
