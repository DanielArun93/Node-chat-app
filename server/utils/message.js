var moment = require('moment');
var date = moment();

var generateMessage = (from,text) => {
    return {
        from,
        text,
        completedAt:date.format('h:mm a')
    }
}
var generateLocationMessage = (from,latitude,longitude) => {
    return {
        from,
        url:`https://www.google.com/maps?q=${latitude},${longitude}`,
        completedAt:date.format('h:mm a')
    }
}



module.exports = {
    generateMessage,
    generateLocationMessage
}