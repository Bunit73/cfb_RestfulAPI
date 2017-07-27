const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const RushingSchema = Schema({
  game: { type: Schema.ObjectId, ref: 'GameSchema', required: true },
  player: { type: Schema.ObjectId, ref: 'PlayerSchema', required: true },
  yards: { type: Number, default: 0 },
  attempted: { type: Number, default: 0 },
  touch_downs: { type: Number, default: 0 },
  fumbles: { type: Number, default: 0 },
}, { collection: 'rushing' });

RushingSchema
    .virtual('url')
    .get(function () { `/rushing/${this._id}`; });

RushingSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Rushing', RushingSchema);
