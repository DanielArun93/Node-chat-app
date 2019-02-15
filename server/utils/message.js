var moment = require('moment');
//var date = moment();

var generateMessage = (from, text) => {
    var updatedDate = new Date();
    return {
        from,
        text,
        completedAt: moment(updatedDate).format('h:mm:ss a')
    }
}
var generateLocationMessage = (from, latitude, longitude) => {
    var updateDate = new Date();
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        completedAt: moment(updateDate).format('h:mm:ss a')
    }
}



module.exports = {
    generateMessage,
    generateLocationMessage
}