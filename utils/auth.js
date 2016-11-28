const rp = require('request-promise');

const constants = require('../constants/constants');
const dao = require('./database');

module.exports = {
    refreshSpotifyToken: (id) => {
        return new Promise((resolve, reject) => {
            dao.getUserById(id).then((row) => {
                let refreshToken = row[0].refreshToken;
                let authOptions = {
                    url: 'https://accounts.spotify.com/api/token',
                    headers: { 'Authorization': 'Basic ' + (new Buffer(constants.SPOTIFY_CLIENT_ID + ':' + constants.SPOTIFY_CLIENT_SECRET).toString('base64')) },
                    form: {
                        grant_type: 'refresh_token',
                        refresh_token: refreshToken
                    },
                    json: true,
                    resolveWithFullResponse: true
                };

                return rp.post(authOptions);
            }).then((response) => {
                if (response.statusCode === 200) {
                    let accessToken = response.body.access_token,
                        expireTime = Date.now() + constants.SPOTIFY_TOKEN_DURATION;

                    return dao.updateUserAccessToken(id, accessToken, expireTime);
                }
            }).then((accessToken) => {
                resolve(accessToken);
            }).catch((val) => {
                reject(val);
            });
        });
    }
};
