const booksRepository = require("../repositories/books.repository.js");

const {
  validateIsbn,
  validateYear,
  validatePositiveNumber,
  validateRequiredString,
} = require("../utils/validators");

const { addBookLinks, addBooksCollectionLinks } = require("../utils/hateoas");

function getAllBooks() {
  const books = booksRepository.findAll().map(addBookLinks);
  return books;
}

function getBookByIsbn(isbn) {
  const book = booksRepository.findByIsbn(isbn);
  if (!book) throw new Error("Book not found");

  return addBookLinks(book);
}

function createBook(bookData) {
  const isbnCheck = validateIsbn(bookData.isbn);
  if (!isbnCheck.valid) throw new Error(isbnCheck.error);

  const titleCheck = validateRequiredString(bookData.title);
  if (!titleCheck.valid) throw new Error(titleCheck.error);

  const authorCheck = validateRequiredString(bookData.author);
  if (!authorCheck.valid) throw new Error(authorCheck.error);

  const yearCheck = validateYear(bookData.year);
  if (!yearCheck.valid) throw new Error(yearCheck.error);

  const genreCheck = validateRequiredString(bookData.genre);
  if (!genreCheck.valid) throw new Error(genreCheck.error);

  const copiesCheck = validatePositiveNumber(bookData.availableCopies);
  if (!copiesCheck.valid) throw new Error(copiesCheck.error);

  if (booksRepository.exists(bookData.isbn)) {
    throw new Error("Book with this ISBN already exists");
  }

  return booksRepository.create(bookData);
}

function updateBook(isbn, bookData) {
  const existing = booksRepository.findByIsbn(isbn);
  if (!existing) throw new Error("Book not found");

  const updated = booksRepository.update(isbn, bookData);
  return updated;
}

function deleteBook(isbn) {
  const existing = booksRepository.findByIsbn(isbn);
  if (!existing) throw new Error("Book not found");

  return booksRepository.deleteByIsbn(isbn);
}

module.exports = {
  getAllBooks,
  getBookByIsbn,
  createBook,
  updateBook,
  deleteBook,
};
