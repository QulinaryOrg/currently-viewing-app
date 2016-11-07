var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var passportSocketIo = require("passport.socketio");
var models = require('./models/models.js');
var initPassport = require('./passport-init')(passport);
var config = require('./_config');
var mongoose = require('mongoose'); 

var app = express();

mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
    if(err) {
        console.log('Error connecting to the database. ' + err);
    } else {
        console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
    }
});

var connectMongo = require('connect-mongo')(session);
var sessionStore = new connectMongo({
        mongooseConnection: mongoose.connection,
        collection: 'session',
    })

var api = require('./routes/api');
var authenticate = require('./routes/authenticate')(passport);
var ipsockets = require('./routes/ipsockets.js');


var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', ipsockets);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(session({
        key: 'taro.sid',
        secret: 'keyboard cat',
        store:  sessionStore,
        saveUninitialized: true
    }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);
app.use('/auth', authenticate);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.use(function(req, res, next){
    res.io = io;
    next();
});

io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,       
    key:          'taro.sid',
    secret:       'keyboard cat',
    store:        sessionStore,
    success:      onAuthorizeSuccess,
    fail:         onAuthorizeFail
}));

function onAuthorizeSuccess(data, accept){
    console.log('successful connection to socket.io');
    if(data.user.username){
        accept(null, true);
    }  
}

function onAuthorizeFail(data, message, error, accept){
    if(error)
        throw new Error(message);
    console.log('failed connection to socket.io:', message);
    accept(null, false);
}

server.listen(3000, function () {
    console.log('Server listening at port %d in %s environment', this.address().port, app.settings.env);
});

module.exports = {app: app, server: server};
