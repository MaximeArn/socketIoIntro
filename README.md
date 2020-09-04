# Fonctionement 

Socket.io works on an event principle. they are created in .emmit and received thanks to .on

--> for .emit and for .on, the type of the event must be specified as the first argument

--> the second argument of .on is a callback function with all instructions to execute 

#### exemple :

```js
//this instruction create a  event 
socket.emit('chat message', 'my usefull message');
//this one do something for each "chat message" type event created 
socket.on('chat message', (msg) => {
    //do something
});
```

--> socket.io allow custom events 

#### exemple :

```js
//this is a custom event emit
socket.emit('createUser', username);
//and its custom event reception
socket.on('createUser', (username) =>{
    //do something
});
```

#### Here are some ideas to improve the application: 

https://socket.io/get-started/chat/#Getting-this-example