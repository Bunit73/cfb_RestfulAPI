const Defense = require('../models/defense');
const util = require('util');

exports.defense_list = function (req, res, next) {
  Defense.find({})
        .exec((err, listDefence) => {
          if (err) { return next(err); }
          res.send(listDefence).status(200);
        });
};

exports.defense_detail = function (req, res, next) {
  Defense.findById(req.params.id, (err, def) => {
    if (err) { return next(err); }
    res.send(def).status(200);
  });
};

exports.defense_create = function (req, res, next) {
  req.checkBody('game', 'Game must not be empty').notEmpty();
  req.checkBody('player', 'Player must not be empty').notEmpty();

  const defense = new Defense({
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
      defense.save((err, defense) => {
        if (err) { return next(err); }
        res.send(defense).status(201);
      });
    }
  });
};

exports.defense_delete = function (req, res, next) {
  Defense.findByIdAndRemove(req.params.id, (err) => {
    if (err) { return next(err); }
    res.sendStatus(204);
  });
};

exports.defense_patch = function (req, res, next) {
  Defense.findById(req.params.id, (err, def) => {
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

exports.defense_put = function (req, res, next) {
  req.checkBody('game', 'Game must not be empty').notEmpty();
  req.checkBody('player', 'Player must not be empty').notEmpty();

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      Defense.findById(req.param.id, (err, def) => {
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
