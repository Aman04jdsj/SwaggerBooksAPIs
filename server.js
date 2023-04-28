const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/book');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const PORT = process.env.PORT || 3000;

/**
 * @swagger
 *   components:
 *     parameters:
 *       bookId:
 *         in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID (A string of 24 hex characters/12 bytes)
 *     schemas:
 *       Book:
 *         type: object
 *         required:
 *           - title
 *           - author
 *           - price
 *         properties:
 *           id:
 *             type: string
 *             description: The auto-generated id of the book
 *           title:
 *             type: string
 *             description: The title of the book
 *           author:
 *             type: string
 *             description: The author of the book
 *           price:
 *             type: number
 *             description: The price of the book
 *           createdAt:
 *             type: string
 *             description: The auto-generated timestamp when the book was first added
 *           updatedAt:
 *             type: string
 *             description: The auto-generated timestamp when the book was last modified
 *           __v:
 *             type: number
 *             description: Version number
 *         example:
 *           id: 6449b28d0efd053def76bf0f
 *           title: Harry Potter and the Chamber of Secrets
 *           author: J.K. Rowling
 *           price: 200
 *           createdAt: 2023-04-26T23:23:57.192Z 
 *           updatedAt: 2023-04-26T23:23:57.192Z
 *           __v: 0
 */

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Book Store APIs',
            version: '1.0.0',
            description: 'Book Store API Documentation',
            servers: [
                {
                    url: 'http://localhost:3000'
                }
            ]
        }
    },
    apis: ['server.js']
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

const app = express();

app.use('/book-api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(express.json())

// Tags

/**
 * @swagger
 *   tags:
 *     name: Book APIs
 *     description: The book management APIs
 */

//Routes

/**
 * @swagger
 *   /books:
 *     get:
 *       summary: Returns a list of all the books
 *       tags: [Book APIs]
 *       responses:
 *         200:
 *           description: The list of books was returned successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Book'
 *         500:
 *           description: An error occurred while retrieving the books
 */
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});


/**
 * @swagger
 *   /books/{id}:
 *     get:
 *       summary: Returns the book by ID
 *       tags: [Book APIs]
 *       parameters:
 *         - $ref: '#/components/parameters/bookId'
 *       responses:
 *         200:
 *           description: The book was returned successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Book'
 *         404:
 *           description: The book with the given ID was not found
 *         500:
 *           description: An error occurred while retrieving the book
 */
app.get('/books/:bookId', async (req, res) => {
    try {
        const { bookId } = req.params;
        const book = await Book.findById(bookId);
        if (!book) {
            res.status(404).send(`Cannot find book with id: ${bookId}`)
        } else {
            res.status(200).json(book);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

/**
 * @swagger
 *   /books:
 *     post:
 *       summary: Create a new book
 *       tags: [Book APIs]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - title
 *                 - author
 *                 - price
 *               properties:
 *                 title:
 *                   type: string
 *                   description: The title of the book
 *                 author:
 *                   type: string
 *                   description: The author of the book
 *                 price:
 *                   type: number
 *                   description: The price of the book
 *               example:
 *                 title: Harry Potter and the Chamber of Secrets
 *                 author: J.K. Rowling
 *                 price: 200
 *       responses:
 *         201:
 *           description: The book was created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Book'
 *         500:
 *           description: An error occurred while retrieving the book
 */
app.post('/books', async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).send(book);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

/**
 * @swagger
 *   /books/{id}:
 *     put:
 *       summary: Update a book by its ID
 *       tags: [Book APIs]
 *       parameters:
 *         - $ref: '#/components/parameters/bookId'
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - title
 *                 - author
 *                 - price
 *               properties:
 *                 title:
 *                   type: string
 *                   description: The title of the book
 *                 author:
 *                   type: string
 *                   description: The author of the book
 *                 price:
 *                   type: number
 *                   description: The price of the book
 *               example:
 *                 title: Harry Potter and the Chamber of Secrets
 *                 author: J.K. Rowling
 *                 price: 200
 *       responses:
 *         200:
 *           description: The book was updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Book'
 *         404:
 *           description: The book with the given ID was not found
 *         500:
 *           description: An error occurred while retrieving the book
 */
app.put('/books/:bookId', async (req, res) => {
    try {
        const { bookId } = req.params;
        const book = await Book.findByIdAndUpdate(bookId, req.body);
        if (!book) {
            res.status(404).send(`Cannot find book with id: ${bookId}`)
        } else {
            const updatedBook = await Book.findById(bookId);
            res.status(200).json(updatedBook);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

/**
 * @swagger
 *   /books/{id}:
 *     delete:
 *       summary: Delete the book by ID
 *       tags: [Book APIs]
 *       parameters:
 *         - $ref: '#/components/parameters/bookId'
 *       responses:
 *         200:
 *           description: The book was deleted successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Book'
 *         404:
 *           description: The book with the given ID was not found
 *         500:
 *           description: An error occurred while deleting the book
 */
app.delete('/books/:bookId', async (req, res) => {
    try {
        const { bookId } = req.params;
        const book = await Book.findByIdAndDelete(bookId);
        if (!book) {
            res.status(200).send(`Cannot find book with id: ${bookId}`)
        } else {
            res.status(200).json(book);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

mongoose
    .connect('mongodb+srv://admin:KMmeLi2XskpLBx6@swaggerdemodb.pcvhq95.mongodb.net/Books?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to MongoDB database')
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        });
    }).catch(error => {
        console.log(error);
    });
