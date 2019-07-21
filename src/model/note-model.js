const Sequelize = require('sequelize');
const sequelize = require('../config/database-config').sequelize;

const Client = require('./client-model');

class Note extends Sequelize.Model { }
Note.init({
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    versao: {
        type: Sequelize.STRING
    },
    cUF: {
        type: Sequelize.STRING
    },
    cNF: {
        type: Sequelize.STRING
    },
    natOp: {
        type: Sequelize.STRING
    },
    mod: {
        type: Sequelize.STRING
    },
    serie: {
        type: Sequelize.STRING
    },
    nNF: {
        type: Sequelize.STRING
    },
    dhEmi: {
        type: Sequelize.STRING
    },
    tpNF: {
        type: Sequelize.STRING
    },
    idDest: {
        type: Sequelize.STRING
    },
    cMunFG: {
        type: Sequelize.STRING
    },
    tpImp: {
        type: Sequelize.STRING
    },
    tpEmis: {
        type: Sequelize.STRING
    },
    cDV: {
        type: Sequelize.STRING
    },
    tpAmb: {
        type: Sequelize.STRING
    },
    finNFe: {
        type: Sequelize.STRING
    },
    indFinal: {
        type: Sequelize.STRING
    },
    indPres: {
        type: Sequelize.STRING
    },
    procEmi: {
        type: Sequelize.STRING
    },
    verProc: {
        type: Sequelize.STRING
    },
    ICMSTot_vBC: {
        type: Sequelize.FLOAT
    },
    ICMSTot_vICMS: {
        type: Sequelize.FLOAT
    },
    ICMSTot_vICMSDeson: {
        type: Sequelize.FLOAT
    },
    ICMSTot_vFCP: {
        type: Sequelize.FLOAT
    },
    ICMSTot_vBCST: {
        type: Sequelize.FLOAT
    },
    ICMSTot_vST: {
        type: Sequelize.FLOAT
    },
    ICMSTot_vFCPST: {
        type: Sequelize.FLOAT
    },
    ICMSTot_vFCPSTRet: {
        type: Sequelize.FLOAT
    },
    ICMSTot_vProd: {
        type: Sequelize.FLOAT
    },
    ICMSTot_vFrete: {
        type: Sequelize.FLOAT
    },
    ICMSTot_vSeg: {
        type: Sequelize.FLOAT
    },
    ICMSTot_vDesc: {
        type: Sequelize.FLOAT
    },
    ICMSTot_vII: {
        type: Sequelize.FLOAT
    },
    ICMSTot_vIPI: {
        type: Sequelize.FLOAT
    },
    ICMSTot_vIPIDevol: {
        type: Sequelize.FLOAT
    },
    ICMSTot_vPIS: {
        type: Sequelize.FLOAT
    },
    ICMSTot_vCOFINS: {
        type: Sequelize.FLOAT
    },
    ICMSTot_vOutro: {
        type: Sequelize.FLOAT
    },
    ICMSTot_vNF: {
        type: Sequelize.FLOAT
    },
    transp_modFrete: {
        type: Sequelize.INTEGER
    },
    detPag_tPag: {
        type: Sequelize.INTEGER
    },
    detPag_vPag: {
        type: Sequelize.FLOAT
    },
    infAdic_infCpl: {
        type: Sequelize.STRING
    },
}, {
        sequelize,
        modelName: 'notes'
    });

Note.belongsTo(Client);

module.exports = Note; 