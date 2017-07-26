const Receiving = require('../models/receiving');
const util = require('util');

exports.recv_list = function (req, res, next) {
  Receiving.find({})
        .exec((err, listRecv) => {
          if (err) { return next(err); }
          res.send(listRecv).status(200);
        });
};

exports.recv_detail = function (req, res, next) {
  Receiving.findById(req.params.id, (err, recv) => {
    if (err) { return next(err); }
    res.send(recv).status(200);
  });
};

exports.recv_create = function (req, res, next) {
  req.checkBody('game', 'Game must not be empty').notEmpty();
  req.checkBody('player', 'Player must not be empty').notEmpty();

  let recv;
  recv = new Receiving({
    game: req.body.game,
    player: req.body.player,
    completed: req.body.completed,
    attempted: req.body.attempted,
    yards: req.body.yards,
    touch_downs: req.body.touch_downs,
  });

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      recv.save((err, recv) => {
        if (err) { return next(err); }
        res.send(recv).stat(201);
      });
    }
  });
};

exports.recv_delete = function (req, res, next) {
  Receiving.findByIdAndRemove(req.params.id, (err) => {
    if (err) { return next(err); }
    res.sendStatus(204);
  });
};

exports.recv_patch = function (req, res, next) {
  Receiving.findById(req.params.id, (err, recv) => {
    if (err) { return next(err); }
    recv.game = req.body.game || recv.game;
    recv.player = req.body.player || recv.player;
    recv.completed = req.body.completed || recv.completed;
    recv.attempted = req.body.attempted || recv.attempted;
    recv.yards = req.body.yards || recv.yards;
    recv.touch_downs = req.body.touch_downs || recv.touch_downs;

    recv.save((err, recv) => {
      if (err) { return next(err); }
      res.send(recv).status(200);
    });
  });
};

exports.recv_put = function (req, res, next) {
  req.checkBody('game', 'Game must not be empty').notEmpty();
  req.checkBody('player', 'Player must not be empty').notEmpty();

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      Receiving.findById(req.param.id, (err, recv) => {
        if (err) { return next(err); }
        recv.game = req.body.game;
        recv.player = req.body.player;
        recv.completed = req.body.completed;
        recv.attempted = req.body.attempted;
        recv.yards = req.body.yards;
        recv.touch_downs = req.body.touch_downs;

        recv.save((err, recv) => {
          if (err) { return next(err); }
          res.send(recv).status(200);
        });
      });
    }
  });
};
