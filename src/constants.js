var fs = require('fs');

module.exports = {
    CLIENT_SECRET: JSON.parse(fs.readFileSync('./src/data/secret.json', 'utf8')).clientSecret,

    CLIENT_ID: 'c0eef40038224899bacce799720f1c28',

    REDIRECT_URI: 'http://localhost:8080/auth/callback',

    STATE_KEY: 'spotify_auth_state',

    SCOPES: 'playlist-read-private playlist-read-collaborative ' +
            'playlist-modify-public playlist-modify-private user-follow-modify ' +
            'user-follow-read user-library-read user-library-modify ' +
            'user-read-private user-read-birthdate user-read-email'
}
