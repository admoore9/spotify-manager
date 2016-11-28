let passport = require('passport');
let Auth0Strategy = require('passport-auth0');
let SpotifyStrategy = require('passport-spotify').Strategy;
let JwtStrategy = require('passport-jwt').Strategy;

const constants = require('../constants/constants');

// configure passport to use Auth0 strategy for authorization
passport.use(
    new Auth0Strategy({
        domain: constants.AUTH0_DOMAIN,
        clientID: constants.AUTH0_CLIENT_ID,
        clientSecret: constants.AUTH0_CLIENT_SECRET,
        callbackURL: constants.AUTH0_CALLBACK_URL
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
        let info = {
            id: profile.id,
            jwt: extraParams.id_token
        };

        return done(null, info);
    })
);

// configure passport to use Spotify strategy for authorization
passport.use(
    new SpotifyStrategy({
        clientID: constants.SPOTIFY_CLIENT_ID,
        clientSecret: constants.SPOTIFY_CLIENT_SECRET,
        callbackURL: constants.SPOTIFY_CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => {
        return done(null, {accessToken, refreshToken, profile});
    })
);

// configure passport to use json web token strategy for authorization
passport.use(
    new JwtStrategy({
        secretOrKey: new Buffer(constants.AUTH0_CLIENT_SECRET, 'base64'),
        jwtFromRequest: (req) => {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                return req.headers.authorization.split(' ')[1];
            } else if (req.query && req.query.token) {
              return req.query.token;
            }
            return null;
        }
    },
    (jwt_payload, done) => {
        return done(null, jwt_payload);
    })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
