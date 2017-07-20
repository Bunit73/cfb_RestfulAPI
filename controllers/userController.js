const User = require('../models/users');

// Create a user
exports.user_create = function (req, res, next) {
  req.checkBody('first_name', 'First name must not be empty').notEmpty();
  req.checkBody('last_name', 'Last name must not be empty').notEmpty();
  req.checkBody('password', 'Password must not be empty').notEmpty();
  req.checkBody('email', 'Email must not be empty').notEmpty();

  req.sanitize('first_name').escape();
  req.sanitize('last_name').escape();
  req.sanitize('email').escape();

  let user;
  user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  });

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      user.save((err, user) => {
        if (err) { return next(err); }
        res.send(user).status(201);
      });
    }
  });
};

exports.user_login = function (req, res, next) {
  req.checkBody('first_name', 'First name must not be empty').notEmpty();
  req.checkBody('last_name', 'Last name must not be empty').notEmpty();
  req.checkBody('password', 'Password must not be empty').notEmpty();
  req.checkBody('email', 'Email must not be empty').notEmpty();

  req.sanitize('first_name').escape();
  req.sanitize('last_name').escape();
  req.sanitize('email').escape();

  let user;
  user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  });

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      User.findOne({ email: req.body.email }, (err, user) => {
        if (err) { return next(err); }
        if (user) {
          user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) { return next(err); }
            if (isMatch) {
              res.sendStatus(200);
            } else {
              res.sendStatus(401);
            }
          });
        } else {
          res.sendStatus(401);
        }
      });
    }
  });
};
