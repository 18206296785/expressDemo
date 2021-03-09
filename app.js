var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
const bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.urlencoded({extended:false}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users',(req,res,next)=>{
  if(req.query.phone){
    next()
  }else{
    console.log(req.query.phone);
    throw new Error('您还没有登录')
  }
})

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 404);
  res.render('error');
});
var debug = require('debug')('my-application'); // debug模块
app.set('port', process.env.PORT || 9090); // 设定监听端口

//启动监听
var server = app.listen(app.get('port'), function () {
  debug('Express server listening on port ' + server.address().port);
});


module.exports = app;
