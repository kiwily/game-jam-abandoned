var socket = io('http://localhost:5000');
socket.on('greeting-from-server', function (message) {
    document.body.appendChild(
        document.createTextNode(message.greeting)
    );
    socket.emit('greeting-from-client', {
        greeting: 'Hello Server'
    });
});