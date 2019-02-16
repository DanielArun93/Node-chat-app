var moment = require('moment');

var generateMessage = (from, text) => {
    return {
        from,
        text,
        completedAt: moment().add(5,'h').add(30,'m').format('h:mm:ss a')
    }
}
var generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        completedAt: moment().add(5,'h').add(30,'m').format('h:mm:ss a')
    }
}



module.exports = {
    generateMessage,
    generateLocationMessage
}