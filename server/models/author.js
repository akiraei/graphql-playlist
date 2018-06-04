const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    city: String
});

module.exports = mongoose.model('author', authorSchema);