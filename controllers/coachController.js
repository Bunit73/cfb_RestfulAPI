const Coach = require('../models/coach');
const util = require('util');

exports.coach_list = function (req, res, next) {
  Coach.find({})
        .exec((err, listCoach) => {
          if (err) { return next(err); }
          res.send(listCoach);
        });
};

// Single Coach
exports.coach_detail = function (req, res, next) {
  Coach.findById(req.params.id, (err, coach) => {
    if (err) { return next(err); }
    res.send(coach).status(200);
  });
};

// Create a coach
exports.coach_create = function (req, res, next) {
  req.checkBody('first_name', 'First Name must not be empty').notEmpty();
  req.checkBody('last_name', 'Last Name must not be empty').notEmpty();

  req.sanitizeBody('first_name').escape();
  req.sanitizeBody('last_name').escape();
  req.sanitizeBody('alma_mater').escape();

  let coach;
  coach = new Coach({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    alma_mater: req.body.alma_mater,
    dob: req.body.dob,
  });

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      coach.save((err, coach) => {
        if (err) { return next(err); }
        res.send(coach).status(201);
      });
    }
  });
};

// Handle Single delete
exports.coach_delete = function (req, res, next) {
  Coach.findByIdAndRemove(req.params.id, (err) => {
    if (err) { return next(err); }
    res.sendStatus(204);
  });
};

// Handle Patch
exports.coach_patch = function (req, res, next) {
  req.sanitize('fist_name').escape();
  req.sanitize('last_name').escape();
  req.sanitize('alma_mater').escape();

  Coach.findById(req.params.id, (err, coach) => {
    if (err) { return next(err); }
    coach.first_name = req.body.name || coach.first_name;
    coach.last_name = req.body.last_name || coach.last_name;
    coach.alma_mater = req.body.alma_mater || coach.alma_mater;
    coach.dob = req.body.dob || coach.dob;

    coach.save((err, coach) => {
      if (err) { return next(err); }
      res.send(coach).status(200);
    });
  });
};

// Handle Put

exports.coach_put = function (req, res, next) {
  req.checkBody('first_name', 'First Name must not be empty').notEmpty();
  req.checkBody('last_name', 'Last Name must not be empty').notEmpty();

  req.sanitizeBody('first_name').escape();
  req.sanitizeBody('last_name').escape();
  req.sanitizeBody('alma_mater').escape();

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      Coach.findById(req.param.id, (err, coach) => {
        if (err) { return next(err); }
        coach.first_name = req.body.first_name;
        coach.last_name = req.body.last_name;
        coach.alma_mater = req.body.alma_mater;
        coach.dob = req.body.dob;
        coach.save((err, coach) => {
          if (err) { return next(err); }
          res.send(coach).status(200);
        });
      });
    }
  });
};
