const booksService = require("../services/books.service");
const { addBooksCollectionLinks } = require("../utils/hateoas");

async function getAllBooks(req, res, next) {
  try {
    const books = await booksService.getAllBooks();
    res.status(200).json({ books, _links: addBooksCollectionLinks() });
  } catch (error) {
    next(error);
  }
}

async function getBookByIsbn(req, res, next) {
  try {
    const { isbn } = req.params;
    const book = await booksService.getBookByIsbn(isbn);
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
}

async function createBook(req, res, next) {
  try {
    const created = await booksService.createBook(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
}

async function updateBook(req, res, next) {
  try {
    const { isbn } = req.params;
    const updated = await booksService.updateBook(isbn, req.body);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
}

async function deleteBook(req, res, next) {
  try {
    const { isbn } = req.params;
    await booksService.deleteBook(isbn);
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
