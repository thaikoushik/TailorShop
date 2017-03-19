var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    imagePath: {type: String, required: true},
});

module.exports = mongoose.model('Category', schema);