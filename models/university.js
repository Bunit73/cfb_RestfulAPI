const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const UniversitySchema = Schema({
    name: {type: String, required: true, unique: true},
    nick_name: {type: String, required: true},
    website: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    team: [{type: Schema.ObjectId, ref: 'Team'}],
    primary_color: {type: String, required: true},
    secondary_color: {type: String},
    trinary_color: {type: String},
});

// Virtual for this university instance
UniversitySchema
    .virtual('url')
    .get(() => `/university/${this._id}`);

UniversitySchema.plugin(uniqueValidator);
module.exports = mongoose.model('University', UniversitySchema);
