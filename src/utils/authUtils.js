var fs = require('fs');
var request = require('request');

var constants = require('../constants');

module.exports = {
    refreshToken: function (req, res, sendResponse) {

        var creds = JSON.parse(fs.readFileSync('./src/data/auth.json', 'utf8'));
        if (typeof creds.refreshToken === "undefined") {
            res.status(401).send('No access token to refresh');
        }

        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {'Authorization': 'Basic ' + (new Buffer(constants.CLIENT_ID + ':' + constants.CLIENT_SECRET).toString('base64'))},
            form: {
                grant_type: 'refresh_token',
                refresh_token: creds.refreshToken
            },
            json: true
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                // expiresIn is conservative number in ms
                var expiresIn = body.expires_in * 900;
                var expireTime = new Date().getTime() + expiresIn;

                creds.accessToken = body.access_token;
                creds.expireTime = expireTime;
                fs.writeFile('./src/data/auth.json', JSON.stringify(creds));

                if (sendResponse) {
                    res.status(200).json(creds);
                }
            }
        });
    }
}
