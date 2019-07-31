const router = require('express').Router();


router.get('/', (req, res, next) => {
    res.render('clients-view', {});
});

router.get('/:id', (req, res, next) => {
    res.render('clients-view', {});
});


module.exports = router;