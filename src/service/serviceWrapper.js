const mysqlService = require('./mysqlService');

module.exports = {
    getUsers: function ({dbInstance}) {
        return mysqlService.findUsers(dbInstance);
    },
}