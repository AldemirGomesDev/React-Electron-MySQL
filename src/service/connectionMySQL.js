var mysql = require('mysql');

module.exports = {
    createConnectionDb: function() {
        console.log('Conectando com o MySQL!');
        var connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'aldemir',
            password : '147852Ag',
            database : 'strsystem'
            });
        // connect to mysql
    connection.connect(function(err) {
        // in case of error
        if(err){
            console.log(err.code);
            console.log(err.fatal);
        }
    });

        return connection;
    },
    
    doneConnectionDb: function(connection) {
        connection.end();
    }
};