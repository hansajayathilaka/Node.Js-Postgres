const { Sequelize } = require('sequelize')


const dbName = 'node-pg', userName = 'node_pg', password = 'node_pg';
module.exports = new Sequelize(dbName, userName, password, {
    host: 'localhost',
    dialect: 'postgres',    /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});
