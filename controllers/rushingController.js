const Rushing = require('../models/rushing');
const util = require('util');

exports.rushing_list = function (req, res, next) {
  Rushing.find({})
        .exec((err, listRush) => {
          if (err) { return next(err); }
          res.send(listRush).status(200);
        });
};

exports.rushing_detail = function (req, res, next) {
  Rushing.findById(req.params.id, (err, rushing) => {
    if (err) { return next(err); }
    res.send(rushing).status(200);
  });
};

exports.create_rushing = function (req, res, next) {
  req.checkBody('game', 'Game must not be empty').notEmpty();
  req.checkBody('player', 'Player must not be empty').notEmpty();

  let rushing;
  rushing = new Rushing({
    game: req.body.game,
    player: req.body.player,
    attempted: req.body.attempted,
    yards: req.body.yards,
    touch_downs: req.body.touch_downs,
    fumbles: req.body.fumbles,
  });

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      rushing.save((err, rushing) => {
        if (err) { return next(err); }
        res.send(rushing).status(201);
      });
    }
  });
};

exports.rushing_delete = function (req, res, next) {
  Rushing.findByIdAndRemove(req.params.id, (err) => {
    if (err) { return next(err); }
    res.sendStatus(204);
  });
};

exports.rushing_patch = function (req, res, next) {
  Rushing.findById(req.params.id, (err, rushing) => {
    if (err) { return next(err); }
    rushing.game = req.body.game || rushing.game;
    rushing.player = req.body.player || rushing.player;
    rushing.attempted = req.body.attempted || rushing.attempted;
    rushing.yards = req.body.yards || rushing.yards;
    rushing.fumbles = req.body.fumbles || rushing.fumbles;

    rushing.save((err, rushing) => {
      if (err) { return next(err); }
      res.send(rushing).status(200);
    });
  });
};

exports.rushing_put = function (req, res, next) {
  req.checkBody('game', 'Game must not be empty').notEmpty();
  req.checkBody('player', 'Player must not be empty').notEmpty();

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      Rushing.findById(req.param.id, (err, rushing) => {
        if (err) { return next(err); }
        rushing.game = req.body.game;
        rushing.player = req.body.player;
        rushing.attempted = req.body.attempted;
        rushing.yards = req.body.yards;
        rushing.fumbles = req.body.fumbles;

        rushing.save((err, rushing) => {
          if (err) { return next(err); }
          res.send(rushing).status(200);
        });
      });
    }
  });
};
