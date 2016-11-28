const router = require('express').Router();

router.use('/healthcheck', require('./healthcheck'));
router.use('/auth', require('./auth'));
router.use('/connect', require('./connect'));

router.use('/available', (req, res) => {
    res.status(200).send('OK');
});

module.exports = router;
