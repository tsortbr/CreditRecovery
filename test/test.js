const xmlreader = require('xmlreader');
const fs = require('fs');
const path = require('path');
var assert = require('assert');

describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

describe('#XMLReader', function () {
    it('should return -1 when the value is not present', function () {
        let pathXMLs = path.join(path.normalize(__dirname + '/..'), 'src', 'public', 'xmlfiles');
        console.log(pathXMLs);

        let xmls = fs.readdirSync(pathXMLs);
        console.log(xmls);

        let filePath = path.join(pathXMLs, xmls[0]);
        let xml = fs.readFileSync(filePath, { encoding: 'utf8' });

        xmlreader.read(xml, (err, file) => {
            if (err) return console.log(err);

            // use .text() to get the content of a node:
            console.log(file.nfeProc.NFe.infNFe.ide.mod.text());
        });

        assert.equal([1, 2, 3].indexOf(4), -1);
    });
});
