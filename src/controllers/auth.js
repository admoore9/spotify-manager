var express = require('express');
var fs = require('fs');
var request = require('request');
var querystring = require('querystring');

var constants = require('../constants');
var authUtils = require('../utils/authUtils');
var stringUtils = require('../utils/stringUtils');

module.exports = {
    login: function(req, res) {
        var state = stringUtils.generateRandomString(16);
        res.cookie(constants.STATE_KEY, state);

        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                client_id: constants.CLIENT_ID,
                response_type: 'code',
                redirect_uri: constants.REDIRECT_URI,
                state: state,
                scope: constants.SCOPES
            })
        );
    },

    callback: function(req, res) {
        var code = req.query.code || null;
        var state = req.query.state || null;
        var storedState = req.cookies ? req.cookies[constants.STATE_KEY] : null;

        if (state === null || state !== storedState) {
            res.status(400).send('Invalid request');
        } else {
            res.clearCookie(constants.STATE_KEY);
            var authOptions = {
                url: 'https://accounts.spotify.com/api/token',
                form: {
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: constants.REDIRECT_URI
                },
                headers: {
                    'Authorization' : 'Basic ' + (new Buffer(constants.CLIENT_ID + ':' + constants.CLIENT_SECRET).toString('base64'))
                },
                json: true
            };

            request.post(authOptions, function (error, response, body) {
                if (!error && response.statusCode === 200) {

                    var expiresIn = body.expires_in * 900;
                    var expireTime = new Date().getTime() + expiresIn;

                    var creds = {};
                    creds.refreshToken = body.refresh_token;
                    creds.accessToken = body.access_token;
                    creds.expireTime = expireTime;
                    fs.writeFile('./src/data/auth.json', JSON.stringify(creds));
                    
                    res.status(200).json(creds);
                }
            });
        }
    },

    refresh: function(req, res) {
        authUtils.refreshToken(req, res, true);
    }
}
