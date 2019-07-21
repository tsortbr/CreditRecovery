var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index-view', { title: 'Express' });
});

module.exports = router;
