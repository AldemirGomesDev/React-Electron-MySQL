module.exports = {
    getUsers: function (dbInstance) {
        return new Promise((resolve, reject) => {
            var sql = 'SELECT `nome`,`login` FROM `usuario`';
            dbInstance.query(sql, function (error, results, fields) {
                if (error) {
                    return reject(error);
                } 
                else {
                    console.log(results[0].nome);
                    return resolve(results);
                }
            });
        });
    }
}