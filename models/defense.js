const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const DefenseSchema = Schema({
  game: { type: Schema.ObjectId, ref: 'GameSchema', required: true },
  player: { type: Schema.ObjectId, ref: 'PlayerSchema', required: true },
  solo_tackles: { type: Number, default: 0 },
  asst_tackles: { type: Number, default: 0 },
  sacks: { type: Number, default: 0 },
  tol: { type: Number, default: 0 },
  interceptions: { type: Number, default: 0 },
}, { collection: 'defense' });

DefenseSchema
    .virtual('url')
    .get(() => `/defence/${this._id}`);

DefenseSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Defense', DefenseSchema);
