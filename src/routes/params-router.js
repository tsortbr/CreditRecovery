const router = require('express').Router();


router.get('/', (req, res, next) => {
    res.render('params-view', {});
});


module.exports = router;