//const usersRepository = require('./UsersRepository');
const UsersRepository = require('./repository/UsersRepository');

module.exports = {
    /*getUsers: function (dbInstance) {
        const users = usersRepository.getUsers(dbInstance);
        console.dir(users);
        return users;
    },*/

    findUsers: function (dbInstance) {
        const usersRepository = new UsersRepository(dbInstance);
        return usersRepository.findUsers();
    }
}