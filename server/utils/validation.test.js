var expect = require('expect');

var {stringCheck} = require('./validation');

describe('validation', () => {
    it('Should reject non string values',()=>{
        var res = stringCheck(98);
        expect(res).toBe(false);
    })

     it('Should reject values has only spaces',()=>{
        var res = stringCheck('    ');
        expect(res).toBe(false);
    })

    it('Should send true if it is string',()=>{
        var res = stringCheck('  asdasd  ');
        expect(res).toBe(true);
    })
})