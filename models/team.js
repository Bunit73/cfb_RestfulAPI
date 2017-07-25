const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const TeamSchema = Schema({
  players: [{ type: Schema.ObjectId, ref: 'Player' }],
  coaches: [{ type: Schema.ObjectId, ref: 'Coach' }],
  stadium: { type: Schema.ObjectId, ref: 'Stadium' },
  seasons: [{ type: Schema.ObjectId, ref: 'Season' }],
  games: [{ type: Schema.ObjectId, ref: 'Game' }],
  conf_season: [{ type: Schema.ObjectId, ref: 'ConfSeason' }],
  current_conf: { type: Schema.ObjectId, ref: 'Conference' },
  university: { type: Schema.ObjectId, ref: 'University', required: true, unique: true },
}, { collection: 'Teams' });

TeamSchema
    .virtual('url')
    .get(() => `/stadium/${this._id}`);

TeamSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Team', TeamSchema);
