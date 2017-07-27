const Punt = require('../models/punting');
const util = require('util');

exports.punting_list = function (req, res, next) {
  Punt.find({})
        .exec((err, listPunt) => {
          if (err) { return next(err); }
          res.send(listPunt).status(200);
        });
};

exports.punting_detail = function (req, res, next) {
  Punt.findById(req.params.id, (err, punting) => {
    if (err) { return next(err); }
    res.send(punting).status(200);
  });
};

exports.punting_delete = function (req, res, next) {
  Punt.findByIdAndRemove(req.params.id, (err, punting) => {
    if (err) { return next(err); }
    res.send(punting).status(204);
  });
};

exports.create_punt = function (req, res, next) {
  req.checkBody('game', 'Game must not be empty').notEmpty();
  req.checkBody('player', 'Player must not be empty').notEmpty();

  let punt;
  punt = new Punt({
    game: req.body.game,
    player: req.body.player,
    attempted: req.body.attempted,
    yards: req.body.yards,
  });

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      punt.save((err, punt) => {
        if (err) { return next(err); }
        res.send(punt).stat(201);
      });
    }
  });
};

exports.punt_patch = function (req, res, next) {
  Punt.findById(req.params.id, (err, punt) => {
    if (err) { return next(err); }
    punt.game = req.body.game || punt.game;
    punt.player = req.body.player || punt.player;
    punt.attempted = req.body.attempted || punt.attempted;
    punt.yards = req.body.yards || punt.yards;

    punt.save((err, punt) => {
      if (err) { return next(err); }
      res.send(punt).status(200);
    });
  });
};

exports.punt_put = function (req, res, next) {
  req.checkBody('game', 'Game must not be empty').notEmpty();
  req.checkBody('player', 'Player must not be empty').notEmpty();

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      Punt.findById(req.param.id, (err, punt) => {
        if (err) { return next(err); }
        punt.game = req.body.game;
        punt.player = req.body.player;
        punt.attempted = req.body.attempted;
        punt.yards = req.body.yards;

        punt.save((err, punt) => {
          if (err) { return next(err); }
          res.send(punt).status(200);
        });
      });
    }
  });
};
