var express = require('express');
var cookieParser = require('cookie-parser');
var routes = require('./src/routes/routes');
var app = express();

app.use(cookieParser());
app.use('/', routes);

app.listen(8080, function () {
    console.log('spotify manager listening on port 8080!');
});
