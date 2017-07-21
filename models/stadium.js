const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const StadiumSchema = Schema({
  name: { type: String, required: true },
  nick_name: { type: String },
  capacity: { type: Number },
  city: { type: String, required: true },
  state: { type: String, required: true },
}, { collection: 'stadiums' });

StadiumSchema
    .virtual('url')
    .get(() => `/stadium/${this._id}`);

StadiumSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Stadium', StadiumSchema);
