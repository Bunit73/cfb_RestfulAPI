const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const PassingSchema = Schema({
  game: { type: Schema.ObjectId, ref: 'GameSchema', required: true },
  player: { type: Schema.ObjectId, ref: 'PlayerSchema', required: true },
  completed: { type: Number, default: 0 },
  attempted: { type: Number, default: 0 },
  yards: { type: Number, default: 0 },
  touch_downs: { type: Number, default: 0 },
  interceptions: { type: Number, default: 0 },
}, { collection: 'passing' });

PassingSchema
    .virtual('url')
    .get(function () { `/passing/${this._id}`; });

PassingSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Passing', PassingSchema);
