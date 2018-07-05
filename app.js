var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var http = require('http').Server(app);
var http = require('http');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// ========================================================
var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end('server connected');
});
var io = require('socket.io').listen(server);
server.listen(3001);
//接続確立時の処理
io.sockets.on('connection', function(socket) {
    console.log('connected!');
});
// ========================================================

var state = {"sign": "stop"};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
var dashboardRouter = require('./routes/dashboard');
var switchRouter = require('./routes/switch');
app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/switch/:state?', (req, res, next) => {
    if(req.params.state == "start") {
        res.send("ok, start");
        state["sign"] = 'start';
    }else if(req.params.state == "finish") {
        state["sign"] = 'finish';
        res.send("ok, finish");
    }
});

app.get('/getState', function(req, res){
    console.log(state["sign"]);
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify({"state":state}));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log('エラーでぇす !');
    next(createError(404));
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

module.exports = app;
