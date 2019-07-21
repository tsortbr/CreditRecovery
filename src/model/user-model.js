const Sequelize = require('sequelize');

const sequelize = require('../config/database-config').sequelize;

class User extends Sequelize.Model { }
User.init({
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false        
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false        
    },
    password:  {
        type: Sequelize.STRING,
        allowNull: false        
    }
}, {
        sequelize,
        modelName: 'user'
    });

module.exports = User;