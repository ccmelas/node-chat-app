var socket = io();

socket.on('connect', function () {
    console.log('Connected to server'); 
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log("New message", message);
    $("#messages").append(`<li>${message.from}: ${message.text}</li>`);
});

$("#message-form").on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'Melas',
        text: $('[name=message]').val()
    }, function(data) {
        console.log('Got it');
        console.log(data);
    });
});

