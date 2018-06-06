const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: String,
    price: Number,
    authorName: String
});

module.exports = mongoose.model('book', Schema);