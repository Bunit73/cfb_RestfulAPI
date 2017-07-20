const jwt = require('jsonwebtoken');
const jwtConfig = require('./jwtConfig');

exports.adminChecker = function (req, res, next) {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token){
        jwt.verify(token, jwtConfig.secret, function (err, decoded) {
            if (err){ return next(err); }
            if(decoded._doc.admin) {
                next();
            } else { res.sendStatus(403); }
        })
    }
    else{
        res.sendStatus(403);
    }
};

exports.protectedChecker = function(req, res, next) {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token){
        jwt.verify(token, jwtConfig.secret, function (err, decoded) {
            if (err){ return next(err); }
            if(decoded) {
                next();
            } else { res.sendStatus(403); }
        })
    }
    else{
        res.sendStatus(403);
    }
};