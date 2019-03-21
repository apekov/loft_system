const express = require('express');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);
module.exports.io = io;

app.use(bodyParser.text());
app.use(express.urlencoded({ extended: false }));
//--------------------
app.use(cookieParser());
app.use(
    session({
        store: new FileStore(),
        secret: 'key-secret',
        key: 'session-key',
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 30 * 60 * 1000,
        },
        saveUninitialized: false,
        resave: true,
        ephemeral: true,
        rolling: true,
    })
);

app.use(express.static(path.join(__dirname, 'dist')));
require('./config/config-passport');
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/api'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log({
        message: err.message,
        error: err,
    });

});

server.listen(3000, () => {
    console.log(`App listen port 3000`);
});
require('./socket_server');

module.exports = server;