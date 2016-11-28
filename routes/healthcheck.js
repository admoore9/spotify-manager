const router = require('express').Router();
const dao = require('../utils/database');

router.get('/db', (req, res) => {
    dao.testConnection().then((val) => {
        res.status(200).send('OK');
    }).catch((val) => {
        res.status(500).send('Unavailable');
    });
});

module.exports = router;
