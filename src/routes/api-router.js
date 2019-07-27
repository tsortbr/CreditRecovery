var express = require('express');
var router = express.Router();

const ClientModel = require('../model/client-model');
const NoteModel = require('../model/note-model');
const ProductModel = require('../model/product-model');

router.get('/v1/clients', (req, res) => {
    ClientModel.findAll({})
        .then(result => {
            res.json(result).end(200);
        })
        .catch(err => {
            res.json({ error: err }).end(500);
        });
});

router.get('/v1/notes', (req, res) => {
    NoteModel.findAll({})
        .then(result => {
            res.json(result).end(200);
        })
        .catch(err => {
            res.json({ error: err }).end(500);
        });
});




router.get('/v1/products', (req, res) => {
    ProductModel.findAll({})
        .then(result => {
            res.json(result).end(200);
        })
        .catch(err => {
            res.json({ error: err }).end(500);
        });
});


module.exports = router;