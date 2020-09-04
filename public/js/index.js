const chat = {

    getElementsFromDOM : () =>{
        chat.messageForm = document.getElementById('messageForm');
        chat.usernameForm = document.getElementById('usernameForm');
        chat.usernameModal = document.getElementById('usernameModal');
    },

    addEventListeners : () =>{
        chat.messageForm.addEventListener('submit', chat.createNewMessage);
        chat.usernameForm.addEventListener('submit', chat.createNewUser)
    },

    createNewMessage : async (event) =>{
        event.preventDefault();
        const messageArea = document.getElementById('messageArea');
        chat.socket.emit('chat message', messageArea.value, chat.socket.username);
        console.log('new message !!');
    },

    createNewUser : (event) =>{
        event.preventDefault();

        username = document.getElementById('usernameField').value;
        console.log(username);
        //hide the modal
        chat.usernameModal.style.display = "none";
        //emit a custom event
        chat.socket.emit('createUser', username);
    },

    displayMessage : () =>{
        chat.socket.on('chat message', (msg) => {
            const messagesZone = document.getElementById('messages');
            const newMessage = document.createElement('li');
            newMessage.textContent = msg;
            messagesZone.appendChild(newMessage);
        });
    },

    init : () =>{
        chat.socket = io();
        chat.getElementsFromDOM();
        chat.addEventListeners()
        chat.displayMessage();
    }
}

chat.init();

