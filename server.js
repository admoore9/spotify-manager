const app = require('express')();

const routes = require('./routes');
const passport = require('./utils/passport');

app.use(require('express-session')({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);


app.listen(8080, () => {
    console.log('spotify manager listening on port 8080!');
});
