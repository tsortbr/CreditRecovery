const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.render('profile-view', {});
});

module.exports = router;