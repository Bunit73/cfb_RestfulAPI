const universities = require('./university');
const stadiums = require('./stadiums');
const coaches = require('./coaches');
const teams = require('./teams');
const confs = require('./conference');
const jwtAuth = require('../../lib/jwt/jwtAuthenticator');

module.exports = function (app) {
  // Public Routes

  // Protected Routes
  app.use(jwtAuth.protectedChecker);
  app.use('/v1/universities', universities.protected);
  app.use('/v1/stadiums', stadiums.protected);
  app.use('/v1/coaches', coaches.protected);
  app.use('/v1/teams', teams.protected);
  app.use('/v1/conferences', confs.protected);

  // Admin Routes
  app.use(jwtAuth.adminChecker);
  app.use('/v1/universities', universities.admin);
  app.use('/v1/stadiums', stadiums.admin);
  app.use('/v1/coaches', coaches.admin);
  app.use('/v1/teams', teams.admin);
  app.use('/v1/conferences', confs.admin);
};
