const universities = require('./university');
const stadiums = require('./stadiums');
const jwtAuth = require('../../lib/jwt/jwtAuthenticator');

module.exports = function (app) {
    // Public Routes

    // Protected Routes
  app.use(jwtAuth.protectedChecker);
  app.use('/v1/universities', universities.protected);
  app.use('/v1/stadiums', stadiums.protected);

    // Admin Routes
  app.use(jwtAuth.adminChecker);
  app.use('/v1/universities', universities.admin);
  app.use('/v1/stadiums', stadiums.admin);
};
