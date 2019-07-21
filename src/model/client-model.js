const Sequelize = require('sequelize');
const sequelize = require('../config/database-config').sequelize;

class Cliente extends Sequelize.Model { }
Cliente.init({
    CNPJ: {
        type: Sequelize.STRING
    },
    xNome: {
        type: Sequelize.STRING
    },
    xFant: {
        type: Sequelize.STRING
    },
    enderEmit_xLgr: {
        type: Sequelize.STRING
    },
    enderEmit_nro: {
        type: Sequelize.STRING
    },
    enderEmit_xBairro: {
        type: Sequelize.STRING
    },
    enderEmit_cMun: {
        type: Sequelize.STRING
    },
    enderEmit_xMun: {
        type: Sequelize.STRING
    },
    enderEmit_UF: {
        type: Sequelize.STRING
    },
    enderEmit_CEP: {
        type: Sequelize.STRING
    },
    enderEmit_cPais: {
        type: Sequelize.STRING
    },
    enderEmit_xPais: {
        type: Sequelize.STRING
    },
    enderEmit_fone: {
        type: Sequelize.STRING
    },
    IE: {
        type: Sequelize.STRING
    },
    CRT: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
}, {
        sequelize,
        modelName: 'clients'
    });

module.exports = Cliente;