const jwt = require('jsonwebtoken');
const jwtConfig = require('./jwtConfig');

const User = require('../../models/users');

/**
 * Control routing for admin only routes
 * @param req
 * @param res
 * @param next
 */
exports.adminChecker = function (req, res, next) {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token){
        jwt.verify(token, jwtConfig.secret, function (err, decoded) {
            if (err){ return next(err); }
            if(decoded._doc.admin) {
                next();
            } else { res.sendStatus(403); }
        })
    } else{
        res.sendStatus(403);
    }
};

/**
 * Control routing for protected routes
 * @param req
 * @param res
 * @param next
 */
exports.protectedChecker = function(req, res, next) {
    let api_token = req.query.api_key;
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (api_token){
        User.findOne({ 'api_token': api_token }, function (err, user) {
            if (err){ return next(err); }
            if (user){
                next();
            } else { res.sendStatus(403); }
        })
    } else if (token){
        jwt.verify(token, jwtConfig.secret, function (err, decoded) {
            if (err){ return next(err); }
            if(decoded) {
                next();
            } else { res.sendStatus(403); }
        })
    } else{ res.sendStatus(403); }
};