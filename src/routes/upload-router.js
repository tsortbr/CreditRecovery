const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const NotesController = require('../controller/notes-controller');

const FILE_DESTINATION = path.join(path.normalize(__dirname+'/..'),'public','xmlfiles');
const uploader = multer({dest:FILE_DESTINATION});

router.get('/', function(req, res, next) {
  res.render('upload-view', {});
});

router.post('/',uploader.array('notes'), NotesController.processNotesMiddleware ,(req, res, next)  => {
  res.redirect('/upload');
});

module.exports = router;
