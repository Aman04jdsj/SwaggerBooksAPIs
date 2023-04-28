const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please enter a book title']
        },
        author: {
            type: String,
            required: [true, 'Please enter an author\'s name']
        },
        price: {
            type: Number,
            required: [true, 'Please enter the book price']
        }
    },
    {
        timestamps: true
    }
)

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;