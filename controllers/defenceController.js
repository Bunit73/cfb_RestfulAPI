const Defence = require('../models/defence');
const util = require('util');

exports.defence_list = function (req, res, next) {
  Defence.find({})
        .exec((err, listDefence) => {
          if (err) { return next(err); }
          res.send(listDefence).status(200);
        });
};

exports.defence_detail = function (req, res, next) {
  Defence.findById(req.params.id, (err, def) => {
    if (err) { return next(err); }
    res.send(def).status(200);
  });
};

exports.defence_create = function (req, res, next) {
  req.checkBody('game', 'Game must not be empty').notEmpty();
  req.checkBody('player', 'Player must not be empty').notEmpty();

  const defence = new Defence({
    game: req.body.game,
    player: req.body.player,
    solo_tackles: req.body.solo_tackles,
    asst_tackles: req.body.asst_tackles,
    sacks: req.body.sacks,
    tol: req.body.tol,
    interceptions: req.body.interceptions,
  });

  req.getValidationResult().then((results) => {
    if (!results.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      defence.save((err, defence) => {
        if (err) { return next(err); }
        res.send(defence).status(201);
      });
    }
  });
};

exports.defence_delete = function (req, res, next) {
  Defence.findByIdAndRemove(req.params.id, (err) => {
    if (err) { return next(err); }
    res.sendStatus(204);
  });
};

exports.defence_patch = function (req, res, next) {
  Defence.findById(req.params.id, (err, def) => {
    if (err) { return next(err); }
    def.game = req.body.game || def.game;
    def.player = req.body.player || def.player;
    def.solo_tackles = req.body.solo_tackles || def.solo_tackles;
    def.asst_tackles = req.body.asst_tackles || def.asst_tackles;
    def.sacks = req.body.sacks || def.sacks;
    def.tol = req.body.tol || def.tol;

    def.save((err, def) => {
      if (err) { return next(err); }
      res.send(def).status(200);
    });
  });
};

exports.defence_put = function (req, res, next) {
  req.checkBody('game', 'Game must not be empty').notEmpty();
  req.checkBody('player', 'Player must not be empty').notEmpty();

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      Defence.findById(req.param.id, (err, def) => {
        if (err) { return next(err); }
        def.game = req.body.game;
        def.player = req.body.player;
        def.solo_tackles = req.body.solo_tackles;
        def.asst_tackles = req.body.asst_tackles;
        def.sacks = req.body.sacks;
        def.tol = req.body.tol;
      });

      def.save((err, def) => {
        if (err) { return next(err); }
        res.send(def).status(200);
      });
    }
  });
};
