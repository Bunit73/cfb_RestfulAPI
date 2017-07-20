const Stadium = require('../models/stadium');
const util = require('util');

// Display all stadiums
exports.stadium_list = function (req, res, next) {
  Stadium.find({})
        .exec((err, listStadium) => {
          if (err) { return next(err); }
          res.send(listStadium);
        });
};

// Display a single stadium
exports.stadium_detail = function (req, res, next) {
  Stadium.findById(req.params.id, (err, stadium) => {
    if (err) { return next(err); }
    res.send(stadium).status(200);
  });
};

// Create a stadium
exports.statdium_create = function (req, res, next) {
  req.checkBody('name', 'Name must not be empty').notEmpty();
  req.checkBody('city', 'City must not be empty').notEmpty();
  req.checkBody('state', 'State must not be empty').notEmpty();

  req.sanitize('name').escape();
  req.sanitize('nick_name').escape();
  req.sanitize('city').escape();
  req.sanitize('state').escape();

  let stadium;
  stadium = new Stadium({
    name: req.body.name,
    nick_name: req.body.nick_name,
    capacity: req.body.capacity,
    city: req.body.city,
    state: req.body.state,
  });

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      stadium.save((err, stadium) => {
        if (err) { return next(err); }
        res.send(stadium).status(201);
      });
    }
  });
};

// Delete a stadium
exports.statdium_delete = function (req, res, next) {
  Stadium.findByIdAndRemove(req.params.id, (err) => {
    if (err) { return next(err); }
    res.sendStatus(204);
  });
};

exports.stadium_patch = function (req, res, next) {
  req.sanitize('name').escape();
  req.sanitize('nick_name').escape();
  req.sanitize('city').escape();
  req.sanitize('state').escape();

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    }
    Stadium.findById(req.params.id, (err, stadium) => {
      if (err) { return next(err); }
      stadium.name = req.body.name || stadium.name;
      stadium.nick_name = req.body.nick_name || stadium.nick_name;
      stadium.city = req.body.city || stadium.city;
      stadium.state = req.body.state || stadium.state;
      stadium.capacity = req.body.capacity || stadium.capacity;

      stadium.save((err, stadium) => {
        if (err) { return next(err); }
        res.send(stadium).status(200);
      });
    });
  });
};


exports.stadium_put = function (req, res, next) {
  req.checkBody('name', 'Name must not be empty').notEmpty();
  req.checkBody('city', 'City must not be empty').notEmpty();
  req.checkBody('state', 'State must not be empty').notEmpty();


  req.sanitize('name').escape();
  req.sanitize('nick_name').escape();
  req.sanitize('city').escape();
  req.sanitize('state').escape();

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    }
    Stadium.findById(req.params.id, (err, stadium) => {
      if (err) { return next(err); }
      stadium.name = req.body.name;
      stadium.nick_name = req.body.nick_name;
      stadium.city = req.body.city;
      stadium.state = req.body.state;
      stadium.capacity = req.body.capacity;

      stadium.save((err, stadium) => {
        if (err) { return next(err); }
        res.send(stadium).status(200);
      });
    });
  });
};
