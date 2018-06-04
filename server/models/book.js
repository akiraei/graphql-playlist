const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    price: Number,
    authorId: String
});

module.exports = mongoose.model('book', bookSchema);