# Fonctionement 

Socket io works on an event principle. they are created in .emmit and received thanks to .on

#### exemple :

```js
//this instruction create a  event 
socket.emit('chat message', 'my usefull message');
//this one do something for each "chat message" type event created 
socket.on('chat message', (msg) => {
    //do something
});
```
