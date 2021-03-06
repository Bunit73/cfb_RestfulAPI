const University = require('../models/university');
const util = require('util');

// Display All Universities
exports.university_list = function (req, res, next) {
  University.find({})
        .exec((err, listUni) => {
          if (err) { return next(err); }
          res.send(listUni);
        });
};

// Display Single University
exports.university_detail = function (req, res, next) {
  University.findById(req.params.id, (err, university) => {
    if (err) { return next(err); }
    res.send(university).status(200);
  });
};

// Handle university create on post
exports.university_create_post = function (req, res, next) {
  req.checkBody('name', 'Name must not be empty.').notEmpty();
  req.checkBody('nick_name', 'Nick Name must not be empty.').notEmpty();
  req.checkBody('website', 'Website must not be empty.').notEmpty();
  req.checkBody('city', 'City must not be empty.').notEmpty();
  req.checkBody('state', 'State must not be empty.').notEmpty();
  req.checkBody('primary_color', 'Primary Color must not be empty.').notEmpty();
  req.checkBody('secondary_color', 'Secondary Color must not be empty.').notEmpty();

  req.sanitize('name').escape();
  req.sanitize('nick_name').escape();
  req.sanitize('website').escape();
  req.sanitize('city').escape();
  req.sanitize('state').escape();
  req.sanitize('primary_color').escape();
  req.sanitize('secondary_color').escape();
  req.sanitize('trinary_color').escape();

  let university;
  university = new University({
    name: req.body.name,
    nick_name: req.body.nick_name,
    website: req.body.website,
    city: req.body.city,
    state: req.body.state,
    team: (typeof req.body.team === 'undefined') ? undefined : req.body.team.split(','),
    primary_color: req.body.primary_color,
    secondary_color: req.body.secondary_color,
    trinary_color: req.body.trinary_color,
  });

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      university.save((err, university) => {
        if (err) { return next(err); }
        res.send(university).status(201);
      });
    }
  });
};

// Handle a single delete
exports.university_delete = function (req, res, next) {
  University.findByIdAndRemove(req.params.id, (err) => {
    if (err) { return next(err); }
    res.sendStatus(204);
  });
};

// Handle Patch
exports.university_patch = function (req, res, next) {
  req.sanitize('name').escape();
  req.sanitize('nick_name').escape();
  req.sanitize('website').escape();
  req.sanitize('city').escape();
  req.sanitize('state').escape();
  req.sanitize('primary_color').escape();

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      University.findById(req.params.id, (err, university) => {
        if (err) { return next(err); }
        university.name = req.body.name || university.name;
        university.nick_name = req.body.nick_name || university.nick_name;
        university.website = req.body.website || university.website;
        university.city = req.body.city || university.city;
        university.state = req.body.state || req.state;
        university.team = req.body.team || req.team;
        university.primary_color = req.body.primary_color || university.primary_color;
        university.secondary_color = req.body.secondary_color || university.secondary_color;
        university.trinary_color = req.body.trinary_color || university.trinary_color;

        university.save((err, university) => {
          if (err) { return next(err); }
          res.send(university).status(200);
        });
      });
    }
  });
};

// Handle Put
exports.university_put = function (req, res, next) {
  req.checkBody('name', 'Name must not be empty.').notEmpty();
  req.checkBody('nick_name', 'Nick Name must not be empty.').notEmpty();
  req.checkBody('website', 'Website must not be empty.').notEmpty();
  req.checkBody('city', 'City must not be empty.').notEmpty();
  req.checkBody('state', 'State must not be empty.').notEmpty();
  req.checkBody('primary_color', 'Primary Color must not be empty.').notEmpty();

  req.sanitize('name').escape();
  req.sanitize('nick_name').escape();
  req.sanitize('website').escape();
  req.sanitize('city').escape();
  req.sanitize('state').escape();
  req.sanitize('primary_color').escape();

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      University.findById(req.params.id, (err, university) => {
        if (err) { return next(err); }
        university.name = req.body.name;
        university.nick_name = req.body.nick_name;
        university.website = req.body.website;
        university.city = req.body.city;
        university.state = req.body.state;
        university.primary_color = req.body.primary_color;
        university.secondary_color = req.body.secondary_color;
        university.trinary_color = req.body.trinary_color;
        university.team = req.team;

        university.save((err, university) => {
          if (err) { return next(err); }
          res.send(university).status(200);
        });
      });
    }
  });
};
