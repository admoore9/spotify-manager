function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

// Auth0 constants
define('AUTH0_DOMAIN', process.env.AUTH0_DOMAIN);
define('AUTH0_CLIENT_ID', process.env.AUTH0_CLIENT_ID);
define('AUTH0_CLIENT_SECRET', process.env.AUTH0_CLIENT_SECRET);
define('AUTH0_CALLBACK_URL', 'http://localhost:8080/auth/callback');

// Spotify constants
define('SPOTIFY_TOKEN_DURATION', 3300000);
define('SPOTIFY_CLIENT_ID', process.env.SPOTIFY_CLIENT_ID);
define('SPOTIFY_CLIENT_SECRET', process.env.SPOTIFY_CLIENT_SECRET);
define('SPOTIFY_CALLBACK_URL', 'http://localhost:8080/connect/spotify/callback');
define('SPOTIFY_STATE_KEY', 'spotify_auth_state');
define('SPOTIFY_SCOPES',
    ['playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-public',
    'playlist-modify-private', 'streaming', 'user-follow-modify', 'user-follow-read',
    'user-library-read', 'user-library-modify', 'user-read-private', 'user-read-birthdate',
    'user-read-email', 'user-top-read']
);
