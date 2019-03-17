const io = require('./server').io;
const uuidv4 = require('uuid/v4');

const clients = {};

io.on('connection', socket => {
    const id = uuidv4();
    let clientObj = {
        id: id,
        username: socket.handshake.headers.username
    };
    clients[id] = clientObj;
    // console.log(clientObj);

    socket.emit('all users', clients);
    socket.broadcast.emit('new users', clientObj);
    socket.emit('new users', clientObj);

    // socket.broadcast.to(socketid).emit('message', 'for your eyes only');
    socket.on('chat message', message => {
        console.log('chat message: ' + message);
        socket.broadcast.send({
            id: clientObj.id,
            message: message
        })
    });
    socket.on('disconnect', () => {
        socket.emit('delete user', id);
        delete clients[id];
    });
});