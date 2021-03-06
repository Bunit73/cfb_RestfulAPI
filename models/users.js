// http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const base64url = require('base64url');

const SALT_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  api_token: { type: String, default: () => base64url(crypto.randomBytes(32)), unique: true },
}, { collection: 'users' });

/**
 * Salt and hash the users password
 */
UserSchema.pre('save', function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) { return next(); }

  // generate a salt
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

/**
 * Compare user password with their input
 * @param candidatePassword: users inputted password
 * @param cb: what to do if there is a password match
 */
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', UserSchema);
