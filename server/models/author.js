const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: String,
    city: String
});

module.exports = mongoose.model('author', Schema);