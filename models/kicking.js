const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const KickingSchema = Schema({
    game: { type: Schema.ObjectId, ref: 'GameSchema', required: true },
    player: { type: Schema.ObjectId, ref: 'PlayerSchema', required: true },
    extra_pnt_attempt: { type: Number, default: 0 },
    extra_pnt_made: { type: Number, default: 0 },
    fg_attempt: { type: Number, default: 0 },
    fg_made: { type: Number, default: 0 },
}, { collection: 'kicking' });

KickingSchema
    .virtual('url')
    .get(function () { `/kicking/${this._id}`; });

KickingSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Kicking', KickingSchema);
