const chat = {

    getElementsFromDOM : () =>{
        chat.messageForm = document.getElementById('messageForm');
        chat.usernameForm = document.getElementById('usernameForm');
        chat.usernameModal = document.getElementById('usernameModal');
        chat.messageArea = document.getElementById('messageArea');
    },

    addEventListeners : () =>{
        chat.messageForm.addEventListener('submit', chat.createNewMessage);
        chat.usernameForm.addEventListener('submit', chat.createNewUser)
        chat.messageArea.addEventListener('keydown', chat.userIsWritting)
    },

    userIsWritting : (event) =>{
        chat.socket.emit('userIsTyping');
    },

    createNewMessage : async (event) =>{
        event.preventDefault();
        //emit an event that will be recepted on server side
        chat.socket.emit('chat message', chat.messageArea.value);
    },

    createNewUser : (event) =>{
        event.preventDefault();

        username = document.getElementById('usernameField').value;
        //hide the modal
        chat.usernameModal.style.display = "none";
        //emit a custom event
        chat.socket.emit('createUser', username);
        chat.socket.username = username;
    },

    displayMessage : () =>{
        chat.socket.on('chat message', (data) => {
            const messagesZone = document.getElementById('messages');
            const newMessage = document.getElementById('messageTemplate').content.cloneNode(true);
            const messageContent = newMessage.querySelector('.messageContent');
            messageContent.textContent = data.msg;
            //if an username is specified add a label that contains this username
            if (data.username){
                //if the message is from you add a class to display it on the right
                if (data.username === chat.socket.username){
                    data.position = 'right';
                }
                //construction of the label
                const messageAuthor = newMessage.querySelector('.messageAuthor');
                messageAuthor.classList.add('messageAuthorStyle');
                messageAuthor.textContent = data.username;
            }
            //if a position is specified add a class 
            if(data.position){
                const message =newMessage.querySelector('.message');
                message.classList.add(data.position);
            };
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

