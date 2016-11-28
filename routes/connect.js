const router = require('express').Router();

const constants = require('../constants/constants');
const dao = require('../utils/database');
const passport = require('../utils/passport');

router.get('/spotify',
    passport.authorize('spotify', {failureRedirect: '/'})
);

router.get('/spotify/callback',
    passport.authorize('spotify', {failureRedirect: '/'}), (req, res) => {

        if (!req.user) {
            res.redirect('/auth');
            return;
        }

        let user = {
            id: req.user.id,
            spotifyUserId: req.account.profile.id,
            accessToken: req.account.accessToken,
            refreshToken: req.account.refreshToken,
            expireTime: Date.now() + constants.SPOTIFY_TOKEN_DURATION
        };

        dao.addUser(user).then(() => {
            res.send({
                message: 'Successfully authenticated with Spotify'
            });
        }).catch(() => {
            res.send({
                error: 'Unable to add user to database'
            });
        });
    }
);

module.exports = router;
