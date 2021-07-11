/*
 * Copyright (c) 2021 Samsung Electronics Co., Ltd. All rights reserved.
 *
 *    This software is a confidential and proprietary information of
 *        Samsung Electronics, Inc. ("Confidential Information").
 *
 *    You shall not disclose such Confidential Information and shall
 *    use it only in accordance with the terms of the license agreement
 *    you entered into with Samsung Electronics.
 */

const knex = require('knex');

module.exports = {
    /**
    * Initializes the application SQLite database
    * @returns Knex instance with the database connection
    */
    initDatabase: async function() {
        const dbConenction = createConnection();
        //await dbConenction.migrate.latest();
        console.log('Conectado com o MySQL!');
        return dbConenction;
    }
};

function createConnection() {
    return knex({
        client: 'mysql',
        connection: {
            host : 'localhost',
            user : 'aldemir',
            password : '147852Ag',
            database : 'strsystem'
        }
    });
}