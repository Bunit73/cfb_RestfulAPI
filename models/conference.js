const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const ConferenceSchema = Schema({
  name: { type: String, required: true, unique: true },
  abbreviation: { type: String, required: true, unique: true },
  date_founded: { type: Date },
  website: { type: String },
  conf_seasons: [{ type: Schema.ObjectId, ref: 'ConfSeason' }],
}, { collection: 'conferences' });

// Virtual for the conference instance
ConferenceSchema
    .virtual('url')
    .get(function () { `/conferences/${this._id}`; });

ConferenceSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Conference', ConferenceSchema);
