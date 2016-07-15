var express = require('express');
var auth = require('../controllers/auth');

var router = express.Router();

// auth
router.get('/auth/login', function(req, res) {
    auth.login(req, res);
});

router.get('/auth/callback', function(req, res) {
    auth.callback(req, res);
});

router.get('/auth/refresh', function(req, res) {
    auth.refresh(req, res);
});

module.exports = router;
