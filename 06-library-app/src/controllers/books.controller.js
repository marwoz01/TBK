// src/controllers/books.controller.js

const booksService = require("../services/books.service");
const { addBooksCollectionLinks } = require("../utils/hateoas");

// GET /api/books
function getAllBooks(req, res, next) {
  try {
    const books = booksService.getAllBooks();
    const collectionLinks = addBooksCollectionLinks();

    res.status(200).json({
      books,
      _links: collectionLinks,
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/books/:isbn
function getBookByIsbn(req, res, next) {
  try {
    const { isbn } = req.params;

    const book = booksService.getBookByIsbn(isbn);

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
}

// POST /api/books
function createBook(req, res, next) {
  try {
    const bookData = req.body;

    const createdBook = booksService.createBook(bookData);

    res.status(201).json(createdBook);
  } catch (error) {
    next(error);
  }
}

// PUT /api/books/:isbn
function updateBook(req, res, next) {
  try {
    const { isbn } = req.params;
    const bookData = req.body;

    const updatedBook = booksService.updateBook(isbn, bookData);

    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
}

// DELETE /api/books/:isbn
function deleteBook(req, res, next) {
  try {
    const { isbn } = req.params;

    booksService.deleteBook(isbn);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllBooks,
  getBookByIsbn,
  createBook,
  updateBook,
  deleteBook,
};
