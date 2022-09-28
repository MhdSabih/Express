const mongoose = require('mongoose');
/* BookModel = {
    bookname: string,
    bookdescription: string,
    author: string
    bookprice: string,
    currency: string,
    rating: string
} */
const bookSchema = new mongoose.Schema({
        bookname: {
            type: String,
            unique: true,
            uppercase: true,
            required: true
        },
        bookdescription: {
            type: String,
            unique: true,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
}})
const bookDocument= new mongoose.model('Book', bookSchema);
module.exports = bookDocument;