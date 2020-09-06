const chat = {

    getElementsFromDOM : () =>{
        chat.messageForm = document.getElementById('messageForm');
        chat.usernameForm = document.getElementById('usernameForm');
        chat.usernameModal = document.getElementById('usernameModal');
        chat.messageArea = document.getElementById('messageArea');
        chat.connectedUsersButton = document.getElementById('connectedUsers');
        chat.connectedUsersModal = document.getElementById('connectedUsersModal');
        chat.hideConnectedUsers = document.getElementById('closeConnectedUsers');
        chat.connectedUsersModalList = chat.connectedUsersModal.querySelector('ul');
    },

    addEventListeners : () =>{
        chat.messageForm.addEventListener('submit', chat.createNewMessage);
        chat.usernameForm.addEventListener('submit', chat.createNewUser);
        // chat.messageArea.addEventListener('keydown', chat.userIsWritting);
        chat.connectedUsersButton.addEventListener('click', chat.showconnectedUsers);
        chat.hideConnectedUsers.addEventListener('click', chat.hideconnectedUsers);
    },

    // userIsWritting : (event) =>{
    //     chat.socket.emit('userIsTyping');
    // },

    showconnectedUsers : () => {      
        console.log('get list');
        chat.socket.emit('getConnectedUsersList');
        //get user list
        chat.socket.on('sendConnectedUsersList', (connectedUsersList) => {
            console.table(connectedUsersList);
            for (const user of connectedUsersList) {
               const listElement = document.createElement('li');
               listElement.textContent = user;
               chat.connectedUsersModalList.appendChild(listElement);
            }
        });
        chat.connectedUsersModal.classList.remove('hidden');
    },

    hideconnectedUsers : () =>{
        chat.connectedUsersModal.classList.add('hidden');
        //empty list in DOM 
        chat.connectedUsersModalList.textContent = "";
    },

    createNewMessage : async (event) =>{
        event.preventDefault();
        //if message field is not null emit an event that will be recepted on server side
        if (chat.messageArea.value) {
            chat.socket.emit('chat message', chat.messageArea.value);
        }
        
    },

    createNewUser : (event) =>{
        event.preventDefault();
        username = document.getElementById('usernameField').value;
        //hide the modal
        chat.usernameModal.classList.add('hidden');
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
                //construction of the label
                const messageAuthor = newMessage.querySelector('.messageAuthor');
                //if the message is from you add a class to display it on the right
                if (data.username === chat.socket.username){
                    data.position = 'right',
                    messageAuthor.textContent = 'You' + ' | ' + data.time ;
                }else{
                    messageAuthor.textContent = data.time + ' | ' + data.username;
                }
            }
            //if a position is specified add a class 
            if(data.position){
                const message =newMessage.querySelector('.message');
                message.classList.add(data.position);
                //add class to make a chat bubble in css
                messageContent.classList.add(`speech-bubble-${data.position}`)
            };
            messagesZone.appendChild(newMessage);
            //empty the message field after displaying
            chat.messageArea.value = "";
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

