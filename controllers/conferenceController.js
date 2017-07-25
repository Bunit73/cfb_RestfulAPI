const Conf = require('../models/conference');
const util = require('util');

exports.conf_list = function (req, res, next) {
  Conf.find({})
        .exec((err, listConf) => {
          if (err) { return next(err); }
          res.send(listConf);
        });
};

// Single Conf
exports.conf_detail = function (req, res, next) {
  Conf.findById(req.params.id, (err, conf) => {
    if (err) { return next(err); }
    res.send(conf).stat(200);
  });
};

// Create a Conf
exports.conf_create = function (req, res, next) {
  req.checkBody('name', 'Name must not be empty').notEmpty();
  req.checkBody('abbreviation', 'Abbreviation must not be empty').notEmpty();

  req.sanitizeBody('name').escape();
  req.sanitizeBody('abbreviation').escape();
  req.sanitizeBody('website').escape();

  let conf;
  conf = new Conf({
    name: req.body.name,
    abbreviation: req.body.abbreviation,
    date_founded: req.body.date_founded,
    website: req.body.website,
    conf_season: req.body.conf_season,
  });

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      conf.save((err, conf) => {
        if (err) { return next(err); }
        res.send(conf).status(201);
      });
    }
  });
};

// Delete
exports.conf_delete = function (req, res, next) {
  Conf.findByIdAndRemove(req.params.id, (err) => {
    if (err) { return next(err); }
    res.sendStatus(204);
  });
};

// Patch
exports.conf_patch = function (req, res, next) {
  req.sanitizeBody('name').escape();
  req.sanitizeBody('abbreviation').escape();
  req.sanitizeBody('website').escape();

  Conf.findById(req.params.id, (err, conf) => {
    if (err) { return next(err); }
    conf.name = req.body.name || conf.name;
    conf.abbreviation = req.body.abbreviation || conf.abbreviation;
    conf.date_founded = req.body.date_founded || conf.date_founded;
    conf.website = req.body.website || conf.website;
    conf.conf_season = req.body.conf_season || conf.conf_season;

    conf.save((err, conf) => {
      if (err) { return next(err); }
      res.send(conf).status(200);
    });
  });
};

// Put
exports.conf_put = function (req, res, next) {
  req.checkBody('name', 'Name must not be empty').notEmpty();
  req.checkBody('abbreviation', 'Abbreviation must not be empty').notEmpty();

  req.sanitizeBody('name').escape();
  req.sanitizeBody('abbreviation').escape();
  req.sanitizeBody('website').escape();

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      Conf.findById(req.param.id, (err, conf) => {
        conf.name = req.body.name;
        conf.abbreviation = req.body.abbreviation;
        conf.date_founded = req.body.date_founded;
        conf.website = req.body.website;
        conf.conf_season = req.body.conf_season;
      });

      conf.save((err, conf) => {
        if (err) { return next(err); }
        res.send(conf).status(200);
      });
    }
  });
};
