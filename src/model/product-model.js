const Sequelize = require('sequelize');
const sequelize = require('../config/database-config').sequelize;
const Note = require('./note-model');

class Product extends Sequelize.Model { }
Product.init({
    nItem: {
        type: Sequelize.INTEGER
    },
    cProd: {
        type: Sequelize.STRING
    },
    cEAN: {
        type: Sequelize.STRING
    },
    xProd: {
        type: Sequelize.STRING
    },
    NCM: {
        type: Sequelize.STRING
    },
    CEST: {
        type: Sequelize.STRING
    },
    EXTIPI: {
        type: Sequelize.STRING
    },
    CFOP: {
        type: Sequelize.STRING
    },
    uCom: {
        type: Sequelize.STRING
    },
    qCom: {
        type: Sequelize.STRING
    },
    vUnCom: {
        type: Sequelize.STRING
    },
    vProd: {
        type: Sequelize.STRING
    },
    cEANTrib: {
        type: Sequelize.STRING
    },
    uTrib: {
        type: Sequelize.STRING
    },
    qTrib: {
        type: Sequelize.STRING
    },
    vUnTrib: {
        type: Sequelize.STRING
    },
    indTot: {
        type: Sequelize.STRING
    },
    imposto_ICMS_orig: {
        type: Sequelize.FLOAT
    },
    imposto_ICMS_CST: {
        type: Sequelize.FLOAT
    },
    imposto_ICMS_modBC: {
        type: Sequelize.FLOAT
    },
    imposto_ICMS_pRedBC: {
        type: Sequelize.FLOAT
    },
    imposto_ICMS_vBC: {
        type: Sequelize.FLOAT
    },
    imposto_ICMS_pICMS: {
        type: Sequelize.FLOAT
    },
    imposto_ICMS_vICMS: {
        type: Sequelize.FLOAT
    },
    imposto_PIS_CST: {
        type: Sequelize.FLOAT
    },
    imposto_PIS_vBC: {
        type: Sequelize.FLOAT
    },
    imposto_PIS_pPIS: {
        type: Sequelize.FLOAT
    },
    imposto_PIS_vPIS: {
        type: Sequelize.FLOAT
    },
    imposto_COFINS_CST: {
        type: Sequelize.FLOAT
    },
    imposto_COFINS_vBC: {
        type: Sequelize.FLOAT
    },
    imposto_COFINS_pCOFINS: {
        type: Sequelize.FLOAT
    },
    imposto_COFINS_vCOFINS: {
        type: Sequelize.FLOAT
    },
}, {
        sequelize,
        modelName: 'products'
    });

Product.belongsTo(Note);

module.exports = Product;