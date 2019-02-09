var stringCheck = (str) => {
    return typeof str === 'string' && str.trim().length>0;
}

module.exports = {
    stringCheck
}