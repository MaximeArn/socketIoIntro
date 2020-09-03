
const chat = {

    addEventListeners : () =>{
        const form = document.getElementById('form');
        form.addEventListener('submit', chat.createNewMessage);
    },

    createNewMessage : (event) =>{
        event.preventDefault();
        const messageArea = document.getElementById('messageArea');
        chat.socket.emit('chat message', messageArea.value);
        console.log('new message !!');  
    },

    init : () =>{
        chat.socket = io();
        chat.addEventListeners()
    }
}

chat.init();

