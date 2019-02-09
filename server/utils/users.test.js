var expect = require('expect');

var { Users } = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();

        users.users = [{
            id: '1',
            name: 'Arun',
            room: 'Home'
        }, {
            id: '2',
            name: 'Ashok',
            room: 'office'
        }, {
            id: '3',
            name: 'Avinash',
            room: 'Home'
        }]
    })

    it('Should create Object', () => {
        var resUser = users.addUsers('123', 'Arun', 'The Office');
        
        expect(users.users.length).toBe(4);
    })

    it('Should return name of Users', () => {
        var userList = users.getUserList('Home');
        //console.log(userList);
        expect(userList).toEqual(['Arun', 'Avinash']);
    })

    it('should remove objc',() => {
        var user = users.removeUser('1');
        expect(user.id).toBe('1');
    })

    it('should not remove objc',() => {
        var user = users.removeUser('111');
        expect(user).toNotExist();
    })

    it('should get user objc',() => {
        var user = users.getUser('2');
        expect(user).toExist();
    })

    it('should not get user objc',() => {
        var user = users.getUser('21');
        expect(user).toNotExist();
    })
})