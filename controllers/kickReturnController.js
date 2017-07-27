const KickRet = require('../models/kickReturn');
const util = require('util');

exports.kick_ret_list = function (req, res, next) {
  KickRet.find({})
        .exec((err, listKickRet) => {
          if (err) { return next(err); }
          res.send(listKickRet);
        });
};

exports.kick_ret_detail = function (req, res, next) {
  KickRet.findById(req.params.id, (err, kickRet) => {
    if (err) { return next(err); }
    res.send(kickRet).status(200);
  });
};

exports.kick_ret_create = function (req, res, next) {
  req.checkBody('game', 'Game must not be empty').notEmpty();
  req.checkBody('player', 'Player must not be empty').notEmpty();

  const kickRet = new KickRet({
    game: req.body.game,
    player: req.body.player,
    attempted: req.body.attempted,
    yards: req.body.yards,
    touch_downs: req.body.touch_downs,
  });

  req.getValidationResult().then((results) => {
    if (!results.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      kickRet.save((err, kick) => {
        if (err) { return next(err); }
        res.send(kick).status(201);
      });
    }
  });
};

exports.kick_ret_delete = function (req, res, next) {
  KickRet.findByIdAndRemove(req.params.id, (err) => {
    if (err) { return next(err); }
    res.sendStatus(204);
  });
};

exports.kick_ret_patch = function (req, res, next) {
  KickRet.findById(req.params.id, (err, kickRet) => {
    if (err) { return next(err); }
    kickRet.game = req.body.game || kickRet.game;
    kickRet.player = req.body.player || kickRet.player;
    kickRet.attempted = req.body.attempted || kickRet.attempted;
    kickRet.yards = req.body.yards || req.yards;
    kickRet.touch_downs = req.body.touch_downs || req.touch_downs;

    kickRet.save((err, kick) => {
      if (err) { return next(err); }
      res.send(kick).status(200);
    });
  });
};

exports.kick_ret_put = function (req, res, next) {
  req.checkBody('game', 'Game must not be empty').notEmpty();
  req.checkBody('player', 'Player must not be empty').notEmpty();

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      KickRet.findById(req.params.id, (err, kickRet) => {
        if (err) { return next(err); }
        kickRet.game = req.body.game;
        kickRet.player = req.body.player;
        kickRet.attempted = req.body.attempted;
        kickRet.yards = req.body.yards;
        kickRet.touch_downs = req.body.touch_downs;

        kickRet.save((err, kick) => {
          if (err) { return next(err); }
          res.send(kick).status(200);
        });
      });
    }
  });
};
