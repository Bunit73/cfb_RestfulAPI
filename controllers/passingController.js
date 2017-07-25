const Passing = require('../models/passing');
const util = require('util');

exports.passing_list = function (req, res, next) {
  Passing.find({})
      .exec((err, listPass) => {
        if (err) { return next(err); }
        res.send(listPass).status(200);
      });
};

exports.pass_detail = function (req, res, next) {
  Passing.findById(req.params.id, (err, passing) => {
    if (err) { return next(err); }
    res.send(passing).status(200);
  });
};

exports.create_passing = function (req, res, next) {
  req.checkBody('game', 'Game must not be empty').notEmpty();
  req.checkBody('player', 'Player must not be empty').notEmpty();

  let passing;
  passing = new Passing({
    game: req.body.game,
    player: req.body.player,
    completed: req.body.completed,
    attempted: req.body.attempted,
    yards: req.body.yards,
    touch_downs: req.body.touch_downs,
    interceptions: req.body.interceptions,
  });

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      passing.save((err, passing) => {
        if (err) { return next(err); }
        res.send(passing).status(201);
      });
    }
  });
};

exports.passing_delete = function (req, res, next) {
  Passing.findByIdAndRemove(req.params.id, (err) => {
    if (err) { return next(err); }
    res.sendStatus(204);
  });
};

exports.passing_patch = function (req, res, next) {
  Passing.findById(req.params.id, (err, passing) => {
    if (err) { return next(err); }
    passing.game = req.body.game || passing.game;
    passing.player = req.body.player || passing.player;
    passing.completed = req.body.completed || passing.completed;
    passing.attempted = req.body.attempted || passing.attempted;
    passing.yards = req.body.yards || passing.yards;
    passing.touch_downs = req.body.touch_downs || passing.touch_downs;
    passing.interceptions = req.body.interceptions || passing.interceptions;
  });
};

exports.passing_put = function (req, res, next) {
  req.checkBody('game', 'Game must not be empty').notEmpty();
  req.checkBody('player', 'Player must not be empty').notEmpty();

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      Passing.findById(req.param.id, (err, passing) => {
        if (err) { return next(err); }
        passing.game = req.body.game;
        passing.player = req.body.player;
        passing.completed = req.body.completed;
        passing.attempted = req.body.attempted;
        passing.yards = req.body.yards;
        passing.touch_downs = req.body.touch_downs;
        passing.interceptions = req.body.interceptions;
      });
      passing.save((err, passing) => {
        if (err) { return next(err); }
        res.send(passing).status(200);
      });
    }
  });
};
