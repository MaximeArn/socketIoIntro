const chat = {

    addEventListeners : () =>{
        const form = document.getElementById('form');
        form.addEventListener('submit', chat.createNewMessage);
    },

    createNewMessage : async (event) =>{
        event.preventDefault();
        const messageArea = document.getElementById('messageArea');
        chat.socket.emit('chat message', messageArea.value);
        console.log('new message !!');
    },

    displayMessage : () =>{
        console.log('first  !');
        chat.socket.on('chat message', (msg) => {
            console.log('second');
            const messagesZone = document.getElementById('messages');
            const newMessage = document.createElement('li');
            newMessage.textContent = msg;
            messagesZone.appendChild(newMessage);
        });
    },

    init : () =>{
        chat.socket = io();
        chat.addEventListeners()
        chat.displayMessage();
    }
}

chat.init();

