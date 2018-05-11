var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');//处理日志


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));//设置模板的存放路径
app.set('view engine', 'ejs');//模板引擎
app.engine('html',require('ejs').__express);//设置对html的渲染方式

app.use(logger('dev'));//指定日志的输出格式
app.use(express.json());//处理json通过content-type来判断是否由自己来处理
app.use(express.urlencoded({ extended: false }));//处理form-urlencoded
app.use(cookieParser());//处理cookie吧请求头中的cookie转成对象，加入一个cookie函数的属性
app.use(express.static(path.join(__dirname, 'public')));//静态文件服务

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);//设置响应状态码
  res.render('error');//渲染模板
});

module.exports = app;
