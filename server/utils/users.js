class Users {
    constructor() {
        this.users = [];
    }

    addUsers(id, name, room) {
        var user = { id, name, room };
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        //send removed obj
        var removedUser = this.getUser(id);
        if (removedUser) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return removedUser;
    }

    getUser(id) {
        var selectedUser = this.users.filter((user) => user.id === id);
        return selectedUser[0];
    }

    getUserList(room) {
        //send array of user names
        var roomUsers = this.users.filter((user) => user.room === room);
        var nameArray = roomUsers.map((user) => user.name);
        return nameArray;
    }
}

module.exports = {
    Users
}