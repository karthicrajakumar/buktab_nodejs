var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose  = require('mongoose');
var passport = require('passport');
mongoose.connect('mongodb://localhost:27017/buktab');
var routes = require('./routes/index');
var jwt    = require('jsonwebtoken');
var User = require('./app/models/user');
var TokenStrategy = require('passport-accesstoken').Strategy;
var users = require('./routes/users');
var saves = require ('./routes/save');
var login = require('./routes/login');
var validate = require('./routes/validate');
var addBook = require('./routes/addBook');
var listforAdd = require('./routes/listforAdd');
var getPost = require('./routes/getPosts');
var manageBooks= require('./routes/manageBooks');
var deletePost = require('./routes/deletePost');
var updatePost = require('./routes/updatePost');
var recentPost = require('./routes/recentPost');
var app = express();
var apiRoutes = express.Router();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/save',saves);
app.use('/login',login);
app.use('/validate',validate);


function authenticate(req,res,next){
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token,"karthic", function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
};
app.use('/postBook',authenticate,addBook);
app.use('/listBooksForAdd',authenticate,listforAdd);
app.use('/getAds', authenticate,getPost);
app.use('/manageBooks',authenticate,manageBooks);
app.use('/delete',authenticate,deletePost);
app.use('/update',authenticate,updatePost);
app.use('/recent',authenticate,recentPost);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
