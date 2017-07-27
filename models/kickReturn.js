const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const KickReturnSchema = Schema({
    game: { type: Schema.ObjectId, ref: 'GameSchema', required: true },
    player: { type: Schema.ObjectId, ref: 'PlayerSchema', required: true },
    attempted: { type: Number, default: 0 },
    yards: { type: Number, default: 0 },
    touch_downs: { type: Number, default: 0 },
});

KickReturnSchema
    .virtual('url')
    .get(function () { `/kickreturn/${this._id}`; });

KickReturnSchema.plugin(uniqueValidator);
module.exports = mongoose.model('KickReturn', KickReturnSchema);
