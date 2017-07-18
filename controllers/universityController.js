const University = require('../models/university');


// Handle university create on post
exports.university_list = function (req, res, next) {
  University.find({})
        .exec((err, listUni) => {
          if (err) {
            return next(err);
          }
          res.send(listUni);
        });
};

// Handle university create on post
exports.university_create_post = function (req, res, next) {
  req.checkBody('name', 'Name must not be empty.').notEmpty();
  req.checkBody('nick_name', 'Nick Name must not be empty.').notEmpty();
  req.checkBody('website', 'Website must not be empty.').notEmpty();
  req.checkBody('city', 'City must not be empty.').notEmpty();
  req.checkBody('state', 'State must not be empty.').notEmpty();
  req.checkBody('primary_color', 'Primary Color must not be empty.').notEmpty();

  req.sanitize('name').escape();
  req.sanitize('nick_name').escape();
  req.sanitize('website').escape();
  req.sanitize('city').escape();
  req.sanitize('state').escape();
  req.sanitize('primary_color').escape();

  let university;
  university = new University({
    name: req.body.name,
    nick_name: req.body.nick_name,
    website: req.body.website,
    city: req.body.city,
    state: req.body.state,
    team: (typeof req.body.team === 'undefined') ? undefined : req.body.team.split(','),
    primary_color: req.body.primary_color,
    secondary_color: req.body.secondary_color,
    trinary_color: req.body.trinary_color,
  });


  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      res.status(400).send(`There have been validation errors: ${util.inspect(result.array())}`);
    } else {
      university.save((err) => {
        if (err) {
          return next(err);
        }
        res.sendStatus(200);
      });
    }
  });
};
