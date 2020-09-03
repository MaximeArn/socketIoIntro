const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 3000 ;

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'))

app.get('/', (req, res) =>{
    res.sendFile( __dirname + '/public/html/')
})

//executed for each user who connects to the server 
io.on('connection', (socket) => {
    //create an "chat message" type event for every users that say user connected
    io.emit('chat message', 'user connected');
    //executed for each user who disconnects to the server 
    socket.on('disconnect', () => {
        //create an "chat message" type event for every users that say user disconnected
        io.emit('chat message', 'user disconnected');    
    });
    //executed for each form submit 
    socket.on('chat message', (msg) => {
        console.log('send to other people !!');
        io.emit('chat message', msg);
      });
});

http.listen(PORT);
