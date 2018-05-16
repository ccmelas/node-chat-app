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

socket.on('newLocationMessage', function(message) {
    $("#messages").append(`<li>${message.from}: <a target="_blank" href="${message.url}">View my current location</a></li>`)
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

var locationButton = $("#send-location");
locationButton.on('click', function(e) {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function() {})
    }, function(err) {
        alert('Unable to fetch location');
    });
});

