const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const PuntingSchema = Schema({
    game: { type: Schema.ObjectId, ref: 'GameSchema', required: true },
    player: { type: Schema.ObjectId, ref: 'PlayerSchema', required: true },
    attempted: { type: Number, default: 0 },
    yards: { type: Number, default: 0 },
}, { collection: 'punting' });

PuntingSchema
    .virtual('url')
    .get(function () { `/punting/${this._id}`; });

PuntingSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Punting', PuntingSchema);
