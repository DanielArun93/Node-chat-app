var socket = io();

//for autoscrolling
function scrollBottom() {
    var message = jQuery('#messages');
    var newmessage = message.children('li:last-child');

    var clientheight = message.prop('clientHeight');
    var scrolltop = message.prop('scrollTop');
    var scrollheight = message.prop('scrollHeight');
    var newMessageHeight = newmessage.innerHeight();
    var lastMessageHeight = newmessage.prev().innerHeight();

    if ((clientheight + scrolltop + newMessageHeight + lastMessageHeight) >= scrollheight) {
        message.scrollTop(scrollheight);
    }
}


socket.on('connect', function () {
    console.log("Connected to the Server");

    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/'
        } else {
            console.log("Auth Successfull");
        }
    })

    socket.on('updateUserList', function (users) {
        //console.log('userlist', users);
        var ol = jQuery('<ol></ol>');
        users.forEach(function(user){
            ol.append(jQuery('<li></li>').text(user));
        })

        jQuery('#users').html(ol);
    })

})

socket.on('newMessage', function (message) {
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        completedAt: message.completedAt
    })
    // console.log(message);
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${message.completedAt}: ${message.text}`);
    jQuery('#messages').append(html);
    scrollBottom();
})

socket.on('newLocationMessage', function (message) {
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        completedAt: message.completedAt
    })
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My Location</a>');

    // li.text(`${message.from}`);
    // a.attr('href', message.url);
    // li.append(a);
    jQuery('#messages').append(html);
    scrollBottom();
})

jQuery('#message_form').on('submit', function (e) {

    e.preventDefault();
    socket.emit('createMessage', {
        text: jQuery('[name=message]').val()
    }, function () {
        jQuery('[name=message]').val('');
    })
})

//var locationButton = jQuery('#send-location');
jQuery('#send-location').on('click', function () {

    if (!navigator.geolocation) {
        console.log("Your browser does not support geolocation!");
    }

    jQuery('#send-location').attr("disabled", "disabled").text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        jQuery('#send-location').removeAttr("disabled").text('Send Location');
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            long: position.coords.longitude
        })
    }, function () {
        jQuery('#send-location').removeAttr("disabled").text('Send Location');
        alert("Not able to fetch !!!");
    })
})

socket.on('disconnect', function () {
    console.log("Disconnected from the server");
})
