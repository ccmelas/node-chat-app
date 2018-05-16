var socket = io();

socket.on('connect', function () {
    console.log('Connected to server'); 
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    var timestamp = moment(message.createdAt).format("H:mm a");
    $("#messages").append(`<li>${message.from} ${timestamp}: ${message.text}</li>`);
});

socket.on('newLocationMessage', function(message) {
    var timestamp = moment(message.createdAt).format("H:mm a");
    $("#messages").append(`<li>${message.from} ${timestamp}: <a target="_blank" href="${message.url}">View my current location</a></li>`)
});

$("#message-form").on('submit', function(e) {
    e.preventDefault();

    var messageTextBox = $('[name=message]');
    socket.emit('createMessage', {
        from: 'Melas',
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val('');
    });
});

var locationButton = $("#send-location");
locationButton.on('click', function(e) {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }

    $(this).attr('disabled', 'disabled');
    $(this).text('SENDING LOCATION ...');

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function() {
            locationButton.removeAttr('disabled');
            locationButton.text('SEND LOCATION');
        })
    }, function(err) {
        alert('Unable to fetch location');
        locationButton.removeAttr('disabled');
        locationButton.text('SEND LOCATION');
    });
});

