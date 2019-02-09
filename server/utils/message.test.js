var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('Should generate correct message object', () => {
        var res = {
            from: "arun",
            text: "this is me"
        }
        var message = generateMessage(res.from, res.text);

        expect(message.from).toMatch(res.from);
        expect(message.text).toMatch(res.text);
        

    })
})