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

router.get('/v1/clients/:cnpj', (req, res) => {
    ClientModel.findOne({ where: { CNPJ: req.params.cnpj } })
        .then(result => {
            res.json(result).end(200);
        })
        .catch(err => {
            res.json({ error: err }).end(500);
        });
});

router.get('/v1/notes', (req, res) => {
    NoteModel.findAndCountAll({})
        .then(result => {
            res.json(result).end(200);
        })
        .catch(err => {
            res.json({ error: err }).end(500);
        });
});

router.get('/v1/notes/:id', (req, res) => {
    NoteModel.findOne({ where: { id: req.params.id } })
        .then(result => {
            res.json(result).end(200);
        })
        .catch(err => {
            res.json({ error: err }).end(500);
        });
});

router.get('/v1/notes/client/:id', (req, res) => {
    NoteModel.findAndCountAll({ where: { clientId: req.params.id } })
        .then(result => {
            res.json(result).end(200);
        })
        .catch(err => {
            res.json({ error: err }).end(500);
        });
});

router.get('/v1/products', (req, res) => {
    ProductModel.findAndCountAll({})
        .then(result => {
            res.json(result).end(200);
        })
        .catch(err => {
            res.json({ error: err }).end(500);
        });
});

router.get('/v1/products/note/:id', (req, res) => {
    ProductModel.findAndCountAll({ where: { noteId: req.params.id } })
        .then(result => {
            res.json(result).end(200);
        })
        .catch(err => {
            res.json({ error: err }).end(500);
        });
});

module.exports = router;