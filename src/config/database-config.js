const path = require('path');
const fs = require('fs');

const mongoose = require('mongoose');
const Sequelize = require('sequelize');

const DB_DIALECT = process.env.DB_DIALECT;
const DB_PATH = process.env.DB_PATH;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_POST;

let sequelize = null;
if (DB_DIALECT == 'sqlite') {
    const rootPath = path.normalize(__dirname + '/../..');
    const dataPath = path.join(rootPath, DB_PATH);
    try {
        fs.mkdirSync(path.dirname(dataPath), { recursive: true });
    } catch (error) {};

    sequelize = new Sequelize({
        dialect: DB_DIALECT,
        storage: dataPath
    });
} else {
    sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
        host: DB_HOST,
        port: DB_PORT,
        dialect: DB_DIALECT
    });
}

function testConnection() {
    return sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
            sequelize.close();
            return true;
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
            return false;
        });
}

module.exports = {
    sequelize: sequelize,
    testConnection: testConnection
};