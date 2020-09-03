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

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        console.log('send to other people !!');
        io.emit('chat message', msg);
      });
});

http.listen(PORT);
