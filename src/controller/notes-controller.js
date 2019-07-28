/** 
 let sample = {
     fieldname: 'notes',
    originalname: '52190606341338000274550010003263401844465970.xml',
    encoding: '7bit',
    mimetype: 'text/xml',
    destination: '/home/r4m1r35/Development/RecuperacaoDeCredito/src/public/xmlfiles',
    filename: '01b70a473bbf15d058ab331643832e93',
    path: '/home/r4m1r35/Development/RecuperacaoDeCredito/src/public/xmlfiles/01b70a473bbf15d058ab331643832e93',
    size: 9010
};
*/

const fs = require('fs');
const xmlreader = require('xmlreader');

const NoteModel = require('../model/note-model');
const ClientModel = require('../model/client-model');
const ProductModel = require('../model/product-model');

class NotesController {
    constructor(xml) {
        this.note = null;
        this.client = null;
        this.products = [];
        this.items = [];
        if (xml) {
            this.read(xml);
        }
    }

    read(xml, filename) {
        const _self = this;
        xmlreader.read(xml, (err, obj) => {
            if (err) throw err;

            if (!obj.nfeProc) {
                console.log('\n@@@@@@@@@@@@@@@@@@@@@@@@');
                console.trace(filename);
                console.log('@@@@@@@@@@@@@@@@@@@@@@@@\n');
                return;
            } else if (!obj.nfeProc.NFe) {
                console.log('\n@@@@@@@@@@@@@@@@@@@@@@@@');
                console.trace(filename);
                console.log('@@@@@@@@@@@@@@@@@@@@@@@@\n');
                return;
            } else if (!obj.nfeProc.NFe.infNFe) {
                console.log('\n@@@@@@@@@@@@@@@@@@@@@@@@');
                console.trace(filename);
                console.log('@@@@@@@@@@@@@@@@@@@@@@@@\n');
                return;
            }

            const mod = _self.extractNoteType(obj);
            _self.client = _self.extractClientObj(obj);
            _self.note = _self.extractNoteObj(obj);
            _self.products = _self.extractProductArray(obj);
            return ClientModel.findOrCreate({ where: { CNPJ: _self.client.CNPJ }, defaults: _self.client })
                .then(nCli => {
                    _self.note.clientId = nCli[0].id;
                    return NoteModel.findOrCreate({ where: { id: _self.note.id }, defaults: _self.note });
                })
                .then(nNote => {
                    for (let index = 0; index < _self.products.length; index++) {
                        _self.products[index].noteId = nNote[0].id;
                        ProductModel.create(_self.products[index]);
                    }
                })
                .then(() => {
                    return true;
                })
                .catch(err => {
                    console.log(err);
                    return false;
                });
        });
    }

    extractNoteType(obj) {
        return obj.nfeProc.NFe.infNFe.ide.mod.text();
    }

    extractNoteObj(obj) {
        return {
            id: this.normalizeValue(obj.nfeProc.NFe.infNFe.attributes().Id),
            versao: this.normalizeValue(obj.nfeProc.NFe.infNFe.attributes().versao),
            cUF: this.normalizeValue(obj.nfeProc.NFe.infNFe.ide.cUF),
            cNF: this.normalizeValue(obj.nfeProc.NFe.infNFe.ide.cNF),
            natOp: this.normalizeValue(obj.nfeProc.NFe.infNFe.ide.natOp),
            mod: this.normalizeValue(obj.nfeProc.NFe.infNFe.ide.mod),
            serie: this.normalizeValue(obj.nfeProc.NFe.infNFe.ide.serie),
            nNF: this.normalizeValue(obj.nfeProc.NFe.infNFe.ide.nNF),
            dhEmi: this.normalizeValue(obj.nfeProc.NFe.infNFe.ide.dhEmi),
            tpNF: this.normalizeValue(obj.nfeProc.NFe.infNFe.ide.tpNF),
            idDest: this.normalizeValue(obj.nfeProc.NFe.infNFe.ide.idDest),
            cMunFG: this.normalizeValue(obj.nfeProc.NFe.infNFe.ide.cMunFG),
            tpImp: this.normalizeValue(obj.nfeProc.NFe.infNFe.ide.tpImp),
            tpEmis: this.normalizeValue(obj.nfeProc.NFe.infNFe.ide.tpEmis),
            cDV: this.normalizeValue(obj.nfeProc.NFe.infNFe.ide.cDV),
            tpAmb: this.normalizeValue(obj.nfeProc.NFe.infNFe.ide.tpAmb),
            finNFe: this.normalizeValue(obj.nfeProc.NFe.infNFe.ide.finNFe),
            indFinal: this.normalizeValue(obj.nfeProc.NFe.infNFe.ide.indFinal),
            indPres: this.normalizeValue(obj.nfeProc.NFe.infNFe.ide.indPres),
            procEmi: this.normalizeValue(obj.nfeProc.NFe.infNFe.ide.procEmi),
            verProc: this.normalizeValue(obj.nfeProc.NFe.infNFe.ide.verProc),
            ICMSTot_vBC: this.normalizeValue(obj.nfeProc.NFe.infNFe.total.ICMSTot.vBC),
            ICMSTot_vICMS: this.normalizeValue(obj.nfeProc.NFe.infNFe.total.ICMSTot.vICMS),
            ICMSTot_vICMSDeson: this.normalizeValue(obj.nfeProc.NFe.infNFe.total.ICMSTot.vICMSDeson),
            ICMSTot_vFCP: this.normalizeValue(obj.nfeProc.NFe.infNFe.total.ICMSTot.vFCP),
            ICMSTot_vBCST: this.normalizeValue(obj.nfeProc.NFe.infNFe.total.ICMSTot.vBCST),
            ICMSTot_vST: this.normalizeValue(obj.nfeProc.NFe.infNFe.total.ICMSTot.vST),
            ICMSTot_vFCPST: this.normalizeValue(obj.nfeProc.NFe.infNFe.total.ICMSTot.vFCPST),
            ICMSTot_vFCPSTRet: this.normalizeValue(obj.nfeProc.NFe.infNFe.total.ICMSTot.vFCPSTRet),
            ICMSTot_vProd: this.normalizeValue(obj.nfeProc.NFe.infNFe.total.ICMSTot.vProd),
            ICMSTot_vFrete: this.normalizeValue(obj.nfeProc.NFe.infNFe.total.ICMSTot.vFrete),
            ICMSTot_vSeg: this.normalizeValue(obj.nfeProc.NFe.infNFe.total.ICMSTot.vSeg),
            ICMSTot_vDesc: this.normalizeValue(obj.nfeProc.NFe.infNFe.total.ICMSTot.vDesc),
            ICMSTot_vII: this.normalizeValue(obj.nfeProc.NFe.infNFe.total.ICMSTot.vII),
            ICMSTot_vIPI: this.normalizeValue(obj.nfeProc.NFe.infNFe.total.ICMSTot.vIPI),
            ICMSTot_vIPIDevol: this.normalizeValue(obj.nfeProc.NFe.infNFe.total.ICMSTot.vIPIDevol),
            ICMSTot_vPIS: this.normalizeValue(obj.nfeProc.NFe.infNFe.total.ICMSTot.vPIS),
            ICMSTot_vCOFINS: this.normalizeValue(obj.nfeProc.NFe.infNFe.total.ICMSTot.vCOFINS),
            ICMSTot_vOutro: this.normalizeValue(obj.nfeProc.NFe.infNFe.total.ICMSTot.vOutro),
            ICMSTot_vNF: this.normalizeValue(obj.nfeProc.NFe.infNFe.total.ICMSTot.vNF),
            transp_modFrete: this.normalizeValue(obj.nfeProc.NFe.infNFe.transp.modFrete),
            detPag_tPag: this.normalizeValue(obj.nfeProc.NFe.infNFe.pag.detPag.tPag),
            detPag_vPag: this.normalizeValue(obj.nfeProc.NFe.infNFe.pag.detPag.vPag),
            infAdic_infCpl: this.normalizeValue(obj.nfeProc.NFe.infNFe.infAdic.infCpl),
        };
    }

    extractClientObj(obj) {
        return {
            CNPJ: this.normalizeValue(obj.nfeProc.NFe.infNFe.emit.CNPJ),
            xNome: this.normalizeValue(obj.nfeProc.NFe.infNFe.emit.xNome),
            xFant: this.normalizeValue(obj.nfeProc.NFe.infNFe.emit.xFant),
            enderEmit_xLgr: this.normalizeValue(obj.nfeProc.NFe.infNFe.emit.enderEmit.xLgr),
            enderEmit_nro: this.normalizeValue(obj.nfeProc.NFe.infNFe.emit.enderEmit.nro),
            enderEmit_xBairro: this.normalizeValue(obj.nfeProc.NFe.infNFe.emit.enderEmit.xBairro),
            enderEmit_cMun: this.normalizeValue(obj.nfeProc.NFe.infNFe.emit.enderEmit.cMun),
            enderEmit_xMun: this.normalizeValue(obj.nfeProc.NFe.infNFe.emit.enderEmit.xMun),
            enderEmit_UF: this.normalizeValue(obj.nfeProc.NFe.infNFe.emit.enderEmit.UF),
            enderEmit_CEP: this.normalizeValue(obj.nfeProc.NFe.infNFe.emit.enderEmit.CEP),
            enderEmit_cPais: this.normalizeValue(obj.nfeProc.NFe.infNFe.emit.enderEmit.cPais),
            enderEmit_xPais: this.normalizeValue(obj.nfeProc.NFe.infNFe.emit.enderEmit.xPais),
            enderEmit_fone: this.normalizeValue(obj.nfeProc.NFe.infNFe.emit.enderEmit.fone),
            IE: this.normalizeValue(obj.nfeProc.NFe.infNFe.emit.IE),
            CRT: this.normalizeValue(obj.nfeProc.NFe.infNFe.emit.CRT),
            email: this.normalizeValue(obj.nfeProc.NFe.infNFe.emit.email),
        };
    }

    extractProductArray(obj) {
        let products = [];
        let productModel = [];
        let mod = obj.nfeProc.NFe.infNFe.ide.mod;

        if (this.haveManyProducts(obj.nfeProc.NFe.infNFe.det)) {
            products = obj.nfeProc.NFe.infNFe.det.array;
        } else {
            products.push(obj.nfeProc.NFe.infNFe.det)
        }

        for (let index = 0; index < products.length; index++) {
            let productItemXml = products[index];
            let product = this.productToModel(productItemXml);
            product = this.taxationICMSCod(productItemXml.imposto.ICMS, product);
            if (mod == 55) {
                product = this.fieldOnlyMod55(productItemXml, product);
            } else {
                product = this.fieldOnlyMod65(productItemXml, product);
            }
            productModel.push(product);
        }
        return productModel;
    }

    haveManyProducts(obj) {
        if (obj.array != undefined) {
            return true;
        }
        return false;
    }

    taxationICMSCod(impostoICMS, product) {
        if (this.isICMS00(impostoICMS)) {
            return this.extractICMS(impostoICMS.ICMS00, product);
        } else if (this.isICMS10(impostoICMS)) {
            return this.extractICMS(impostoICMS.ICMS10, product);
        } else if (this.isICMS20(impostoICMS)) {
            return this.extractICMS(impostoICMS.ICMS20, product);
        } else if (this.isICMS30(impostoICMS)) {
            return this.extractICMS(impostoICMS.ICMS30, product);
        } else if (this.isICMS40(impostoICMS)) {
            return this.extractICMS(impostoICMS.ICMS40, product);
        } else if (this.isICMS41(impostoICMS)) {
            return this.extractICMS(impostoICMS.ICMS41, product);
        } else if (this.isICMS50(impostoICMS)) {
            return this.extractICMS(impostoICMS.ICMS50, product);
        } else if (this.isICMS51(impostoICMS)) {
            return this.extractICMS(impostoICMS.ICMS51, product);
        } else if (this.isICMS60(impostoICMS)) {
            return this.extractICMS(impostoICMS.ICMS60, product);
        } else if (this.isICMS70(impostoICMS)) {
            return this.extractICMS(impostoICMS.ICMS70, product);
        } else if (this.isICMS90(impostoICMS)) {
            return this.extractICMS(impostoICMS.ICMS90, product);
        }
    }

    isICMS00(ICMS) {
        if (ICMS.ICMS00 != undefined) {
            return true;
        }
    }

    isICMS10(ICMS) {
        if (ICMS.ICMS10 != undefined) {
            return true;
        }
    }

    isICMS20(ICMS) {
        if (ICMS.ICMS20 != undefined) {
            return true;
        }
    }

    isICMS30(ICMS) {
        if (ICMS.ICMS30 != undefined) {
            return true;
        }
    }

    isICMS40(ICMS) {
        if (ICMS.ICMS40 != undefined) {
            return true;
        }
    }

    isICMS41(ICMS) {
        if (ICMS.ICMS41 != undefined) {
            return true;
        }
    }

    isICMS50(ICMS) {
        if (ICMS.ICMS50 != undefined) {
            return true;
        }
    }

    isICMS51(ICMS) {
        if (ICMS.ICMS51 != undefined) {
            return true;
        }
    }

    isICMS60(ICMS) {
        if (ICMS.ICMS60 != undefined) {
            return true;
        }
    }

    isICMS70(ICMS) {
        if (ICMS.ICMS70 != undefined) {
            return true;
        }
    }

    isICMS90(ICMS) {
        if (ICMS.ICMS90 != undefined) {
            return true;
        }
    }

    extractICMS(ICMS, product) {
        product.imposto_ICMS_orig = this.normalizeValue(ICMS.orig);
        product.imposto_ICMS_CST = this.normalizeValue(ICMS.CST);
        product.imposto_ICMS_modBC = this.normalizeValue(ICMS.modBC);
        product.imposto_ICMS_vBC = this.normalizeValue(ICMS.vBC);
        product.imposto_ICMS_pICMS = this.normalizeValue(ICMS.pICMS);
        product.imposto_ICMS_vICMS = this.normalizeValue(ICMS.vICMS);
        return product;
    }

    productToModel(productItemXml) {
        return {
            nItem: this.normalizeValue(productItemXml.attributes().nItem),
            cProd: this.normalizeValue(productItemXml.prod.cProd),
            cEAN: this.normalizeValue(productItemXml.prod.cEAN),
            xProd: this.normalizeValue(productItemXml.prod.xProd),
            NCM: this.normalizeValue(productItemXml.prod.NCM),
            EXTIPI: this.normalizeValue(productItemXml.prod.EXTIPI),
            CFOP: this.normalizeValue(productItemXml.prod.CFOP),
            uCom: this.normalizeValue(productItemXml.prod.uCom),
            qCom: this.normalizeValue(productItemXml.prod.qCom),
            vUnCom: this.normalizeValue(productItemXml.prod.vUnCom),
            vProd: this.normalizeValue(productItemXml.prod.vProd),
            cEANTrib: this.normalizeValue(productItemXml.prod.cEANTrib),
            uTrib: this.normalizeValue(productItemXml.prod.uTrib),
            qTrib: this.normalizeValue(productItemXml.prod.qTrib),
            vUnTrib: this.normalizeValue(productItemXml.prod.vUnTrib),
            indTot: this.normalizeValue(productItemXml.prod.indTot),

            /**
             * Não encontrado nos produtos
             * imposto_ICMS_pRedBC: this.normalizeValue(obj.prod.imposto.ICMS.ICMS00),             
             */
        }
    }

    fieldOnlyMod55(productItemXml, product) {
        product.imposto_PIS_CST = this.normalizeValue(productItemXml.prod.imposto.PIS.PISAliq.CST);
        product.imposto_PIS_vBC = this.normalizeValue(productItemXml.prod.imposto.PIS.PISAliq.vBC);
        product.imposto_PIS_pPIS = this.normalizeValue(productItemXml.prod.imposto.PIS.PISAliq.pPIS);
        product.imposto_PIS_vPIS = this.normalizeValue(productItemXml.prod.imposto.PIS.PISAliq.vPIS);
        product.imposto_COFINS_CST = this.normalizeValue(productItemXml.prod.imposto.COFINS.COFINSAliq.CST);
        product.imposto_COFINS_vBC = this.normalizeValue(productItemXml.prod.imposto.COFINS.COFINSAliq.vBC);
        product.imposto_COFINS_pCOFINS = this.normalizeValue(productItemXml.prod.imposto.COFINS.COFINSAliq.pCOFINS);
        product.imposto_COFINS_vCOFINS = this.normalizeValue(productItemXml.prod.imposto.COFINS.COFINSAliq.vCOFINS);
        return product;
    }

    fieldOnlyMod65(productItemXml, product) {
        product.CEST = this.normalizeValue(productItemXml.prod.CEST);
        return product;
    }

    normalizeValue(value) {
        if (!value) return null;
        if (typeof value == 'string' || typeof value == 'number')
            return value;
        if (!!value.text) return value.text();
        return null;
    }

    doBackupNote() {

    }

    deleteNote() {

    }
}

const Promise = require('bluebird');
const readFile = Promise.promisify(require("fs").readFile);
NotesController.processNotesMiddleware = (req, res, next) => {
    if (req.files) {
        Promise.each(req.files, (file) => {
            return readFile(file.path, 'utf8')
                .then((data) => {
                    const ctrl = new NotesController();
                    return ctrl.read(data.toString('utf8'), file.originalname);
                });
        }).then((result) => {
            console.log("Done!");
        });
    }
    next();
};

module.exports = NotesController;