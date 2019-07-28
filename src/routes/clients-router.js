const router = require('express').Router();


router.get('/', (req, res, next) => {
    res.render('clients-view', {});
});


module.exports = router;