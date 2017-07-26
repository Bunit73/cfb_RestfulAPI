const Team = require('../models/team');
const util = require('util');

// Display all teams
exports.team_list = function (req, res, next) {
  Team.find({})
        .exec((err, listTeam) => {
          if (err) { return next(err); }
          res.send(listTeam);
        });
};

// Display single team
exports.team_detail = function (req, res, next) {
  Team.findById(req.params.id, (err, team) => {
    if (err) { return next(err); }
    res.send(team).status(200);
  });
};

// Create a Team
exports.create_team = function (req, res, next) {
  req.checkBody('university', 'University must not be empty.').notEmpty();

  let team;
  team = new Team({
    players: req.body.players,
    coaches: req.body.coaches,
    stadium: req.body.stadium,
    seasons: req.body.seasons,
    games: req.body.games,
    conf_season: req.body.conf_season,
    current_conf: req.body.current_conf,
    university: req.body.university,
  });

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      team.save((err, team) => {
        if (err) { return next(err); }
        res.send(team).status(201);
      });
    }
  });
};

// Delete a Team
exports.team_delete = function (req, res, next) {
  Team.findByIdAndRemove(req.params.id, (err) => {
    if (err) { return next(err); }
    res.sendStatus(204);
  });
};

// Team Patch
exports.team_patch = function (req, res, next) {
  Team.findById(req.params.id, (err, team) => {
    if (err) { return next(err); }
    team.players = req.body.players || team.players;
    team.coaches = req.body.coaches || team.coaches;
    team.stadium = req.body.stadium || team.stadium;
    team.seasons = req.body.seasons || team.seasons;
    team.games = req.body.games || team.games;
    team.conf_season = req.body.conf_season || team.conf_season;
    team.current_conf = req.body.current_conf || team.current_conf;
    team.university = req.body.university || team.university;
    team.save((err, team) => {
      if (err) { return next(err); }
      res.send(team).status(200);
    });
  });
};

exports.team_put = function (req, res, next) {
  req.checkBody('university', 'University must not be empty.').notEmpty();

  let team;
  team = new Team({
    players: req.body.players,
    coaches: req.body.coaches,
    stadium: req.body.stadium,
    seasons: req.body.seasons,
    games: req.body.games,
    conf_season: req.body.conf_season,
    current_conf: req.body.current_conf,
    university: req.body.university,
  });

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      team.findById(req.params.id, (err, team) => {
        team.players = req.body.players;
        team.coaches = req.body.coaches;
        team.stadium = req.body.stadium;
        team.seasons = req.body.seasons;
        team.games = req.body.games;
        team.conf_season = req.body.conf_season;
        team.current_conf = req.body.current_conf;
        team.university = req.body.university;
        team.save((err, team) => {
          if (err) { return next(err); }
          res.send(team).status(201);
        });
      });
    }
  });
};
