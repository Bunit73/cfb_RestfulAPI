const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const ReceivingSchema = Schema({
  game: { type: Schema.ObjectId, ref: 'GameSchema', required: true },
  player: { type: Schema.ObjectId, ref: 'PlayerSchema', required: true },
  completed: { type: Number, default: 0 },
  attempted: { type: Number, default: 0 },
  yards: { type: Number, default: 0 },
  touch_downs: { type: Number, default: 0 },
}, { collection: 'receiving' });

ReceivingSchema
    .virtual('url')
    .get(() => `/receiving/${this._id}`);

ReceivingSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Receiving', ReceivingSchema);
