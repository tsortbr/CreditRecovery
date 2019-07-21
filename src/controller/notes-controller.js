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

const fs = require('fs');
const xmlreader = require('xmlreader');

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

    read(xml) {
        const _self = this;
        xmlreader.read(xml, (err, obj) => {
            const mod = _self.extractNoteType(obj); 
            if(mod == '55'){
                
            }else if(mod == '65'){

            }else{
                throw new Error('Modelo de Nota Invalido!');
            }
        });
    }

    extractNoteType(obj){
        return obj.nfeProc.NFe.infNFe.ide.mod.text();
    }

    extractNote() {

    }
    extractClient() {

    }
    extractProducts() {

    }
}

NotesController.processNotesMiddleware = (req, res, next) => {
    if (req.files) {
        req.files.forEach(note => {
            fs.readFile(note.path, (err, data) => {
                new NotesController(data);
            });
        });
    }
    next();
};

module.exports = NotesController;