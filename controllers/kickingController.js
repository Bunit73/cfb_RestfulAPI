const Kicking = require('../models/kicking');
const util = require('util');

exports.kicking_list = function (req, res, next) {
  Kicking.find({})
        .exec((err, listKicking) => {
          if (err) { return next(err); }
          res.send(listKicking).status(200);
        });
};

exports.kicking_detail = function (req, res, next) {
  Kicking.findById(req.params.id, (err, kicking) => {
    if (err) { return next(err); }
    res.send(kicking).stat(200);
  });
};

exports.kicking_create = function (req, res, next) {
  req.checkBody('game', 'Game must not be empty').notEmpty();
  req.checkBody('player', 'Player must not be empty').notEmpty();

  let kick;
  kick = new Kicking({
    game: req.body.game,
    player: req.body.player,
    extra_pnt_attempt: req.extra_pnt_attempt,
    extra_pnt_made: req.extra_pnt_made,
    fg_attempt: req.fg_attempt,
    fg_made: req.fg_made,
  });

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      kick.save((err, kick) => {
        if (err) { return next(err); }
        res.send(kick).status(201);
      });
    }
  });
};

exports.kicking_delete = function (req, res, next) {
  Kicking.findByIdAndRemove(req.params.id, (err) => {
    if (err) { return next(err); }
    res.sendStatus(204);
  });
};

exports.kicking_patch = function (req, res, next) {
  Kicking.findById(req.params.id, (err, kick) => {
    if (err) { return next(err); }
    kick.game = req.body.game || kick.game;
    kick.player = req.body.player || kick.player;
    kick.extra_pnt_attempt = req.body.extra_pnt_attempt || kick.extra_pnt_attempt;
    kick.extra_pnt_made = req.body.extra_pnt_made || kick.extra_pnt_made;
    kick.fg_attempt = req.body.fg_attempt || kick.fg_attempt;
    kick.fg_made = req.body.fg_made || req.fg_made;

    kick.save((err, kick) => {
      if (err) { return next(err); }
      res.send(kick).status(200);
    });
  });
};

exports.kicking_put = function (req, res, next) {
  req.checkBody('game', 'Game must not be empty').notEmpty();
  req.checkBody('player', 'Player must not be empty').notEmpty();

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      Kicking.findById(req.param.id, (err, kick) => {
        if (err) { return next(err); }
        kick.game = req.body.game;
        kick.player = req.body.player;
        kick.extra_pnt_attempt = req.body.extra_pnt_attempt;
        kick.extra_pnt_made = req.body.extra_pnt_made;
        kick.fg_attempt = req.body.fg_attempt;
        kick.fg_made = req.body.fg_made;

        kick.save((err, kick) => {
          if (err) { return next(err); }
          res.send(kick).status(200);
        });
      });
    }
  });
};
