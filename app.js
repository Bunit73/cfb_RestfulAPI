process.env.NODE_ENV = 'dev';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');
const expressValidator = require('express-validator');

// JWT
const jwt = require('jsonwebtoken');
const jwtConfig = require('./lib/jwt/jwtConfig');

const index = require('./routes/index');
const users = require('./routes/users');

const compression = require('compression');
const helmet = require('helmet');

const app = express();

app.set('jwtSecret', jwtConfig.secret);

app.use(helmet());

// Mongoose Conn
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
const dbCon = require('./lib/dbCon');

const dbUrl = (process.env.NODE_ENV === 'production') ? dbCon.production.database.host : dbCon.development.database.host;
mongoose.connect(dbUrl, { useMongoClient: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true,
}));

app.use(compression());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

const v1 = require('./routes/v1/v1')(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
