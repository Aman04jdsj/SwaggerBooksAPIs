/* eslint-disable no-unused-vars */
const Service = require('./Service');
const Book = require('../models/book');

/**
* Returns a list of all the books
*
* returns List
* */
const booksGET = () => new Promise(
  async (resolve, reject) => {
    try {
      const books = await Book.find({});
      resolve(Service.successResponse(books));
    } catch (e) {
      reject(Service.rejectResponse(e));
    }
  },
);
/**
* Delete the book by ID
*
* id String The book ID (A string of 24 hex characters/12 bytes)
* returns Book
* */
const booksIdDELETE = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const book = await Book.findByIdAndDelete(id);
      if (!book) {
        reject(Service.rejectResponse(
          `Cannot find book with id: ${id}`,
          404,
        ));
      } else {
        resolve(Service.successResponse(book));
      }
    } catch (e) {
      reject(Service.rejectResponse(e));
    }
  },
);
/**
* Returns the book by ID
*
* id String The book ID (A string of 24 hex characters/12 bytes)
* returns Book
* */
const booksIdGET = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const book = await Book.findById(id);
      if (!book) {
        reject(Service.rejectResponse(
          `Cannot find book with id: ${id}`,
          404,
        ));
      } else {
        resolve(Service.successResponse(book));
      }
    } catch (e) {
      reject(Service.rejectResponse(e));
    }
  },
);
/**
* Update a book by its ID
*
* id String The book ID (A string of 24 hex characters/12 bytes)
* booksPostRequest BooksPostRequest 
* returns Book
* */
const booksIdPUT = ({ id, booksPostRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      const book = await Book.findByIdAndUpdate(id, booksPostRequest);
      if (!book) {
        reject(Service.rejectResponse(
          `Cannot find book with id: ${id}`,
          404,
        ));
      } else {
        const updatedBook = await Book.findById(id);
        resolve(Service.successResponse(updatedBook));
      }
    } catch (e) {
      reject(Service.rejectResponse(e));
    }
  },
);
/**
* Create a new book
*
* booksPostRequest BooksPostRequest 
* returns Book
* */
const booksPOST = ({ booksPostRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      const book = await Book.create(booksPostRequest);
      resolve(Service.successResponse(
        book,
        201
      ));
    } catch (e) {
      reject(Service.rejectResponse(e));
    }
  },
);

module.exports = {
  booksGET,
  booksIdDELETE,
  booksIdGET,
  booksIdPUT,
  booksPOST,
};
