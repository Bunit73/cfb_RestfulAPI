const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const SeasonSchema = Schema({
  year: { type: Date, required: true, unique: true },
  teams: [{ type: Schema.ObjectId, ref: 'TeamSchema' }],
  conf_seasons: [{ type: Schema.ObjectId, ref: 'ConfSeason' }],
  games: [{ type: Schema.ObjectId, ref: 'GameSchema' }],
  champion: [{ type: Schema.ObjectId, ref: 'TeamSchema' }],
}, { collection: 'seasons' });

// Virtual
SeasonSchema
    .virtual('url')
    .get(function () { `/seasons/${this.id}`; });

SeasonSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Season', SeasonSchema);
