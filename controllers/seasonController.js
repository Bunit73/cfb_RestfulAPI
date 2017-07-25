const Season = require('../models/season');
const util = require('util');

exports.season_list = function (req, res, next) {
  Season.find({})
        .exec((err, listSeason) => {
          if (err) { return next(err); }
          res.send(listSeason).status(200);
        });
};

exports.season_detail = function (req, res, next) {
  Season.findById(req.params.id, (err, season) => {
    if (err) { return next(err); }
    res.send(season).status(200);
  });
};

exports.season_create = function (req, res, next) {
  req.checkBody('year', 'Year must not be blank').notEmpty();

  let season;
  season = new Season({
    year: req.body.year,
    teams: req.body.teams,
    conf_season: req.body.conf_seasons,
    games: req.body.games,
    champion: req.body.champion,
  });

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      season.save((err, season) => {
        if (err) {
          return next(err);
        }
        res.send(season).status(201);
      });
    }
  });
};

exports.season_delete = function (req, res, next) {
  Season.findByIdAndRemove(req.params.id, (err) => {
    if (err) { return next(err); }
    res.sendStatus(204);
  });
};

exports.season_patch = function (req, res, next) {
  Season.findById(req.params.id, (err, season) => {
    if (err) { return next(err); }
    season.year = req.body.year || season.year;
    season.teams = req.body.teams || season.teams;
    season.conf_seasons = req.body.conf_seasons || season.conf_seasons;
    season.games = req.body.games || season.games;
    season.champion = req.body.champion || season.champion;

    season.save((err, season) => {
      if (err) { return next(err); }
      res.send(season).status(200);
    });
  });
};

// Handle Put
exports.season_put = function (req, res, next) {
  req.checkBody('year', 'Year must not be blank').notEmpty();

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      Season.findById(req.param.id, (err, season) => {
        if (err) { return next(err); }
        season.year = req.body.year;
        season.teams = req.body.teams;
        season.conf_seasons = req.body.conf_seasons;
        season.games = req.body.games;
        season.champion = req.body.champion;
      });

      season.save((err, season) => {
        if (err) { return next(err); }
        res.send(season).status(200);
      });
    }
  });
};
