const router = require('express').Router();

const passport = require('../utils/passport');

router.get('/',
    passport.authenticate('auth0', {}),
    (req, res) => {}
);

router.get('/callback',
    passport.authenticate('auth0', {failureRedirect: '/login'}),
    (req, res) => {
        if (!req.user) throw new Error('user null');

        res.status(200).send({
            accessToken: req.user.jwt
        });
    }
);

router.get('/test',
    passport.authenticate('jwt', {failureRedirect: '/login'}),
    (req, res) => {
        res.status(200).json(req.user);
    }
);

module.exports = router;
