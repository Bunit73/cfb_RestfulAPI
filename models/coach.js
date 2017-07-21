const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const CoachSchema = Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    alma_mater: { type: String },
    dob: { type: Date },
    teams:  [{ type: Schema.ObjectId, ref: 'Team' }],
});

CoachSchema
    .virtual('url')
    .get(function () { `/coach/${this._id}`; });

CoachSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Coach', CoachSchema);
