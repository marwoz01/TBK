// src/services/books.service.js

const booksRepository = require("../repositories/books.repository");
const { addBookLinks } = require("../utils/hateoas");
const {
  validateIsbn,
  validateYear,
  validatePositiveNumber,
  validateRequiredString,
} = require("../utils/validators");

// Zwraca WSZYSTKIE książki z dodanymi linkami HATEOAS
function getAllBooks() {
  const books = booksRepository.findAll();
  const booksWithLinks = books.map((book) => addBookLinks(book));
  return booksWithLinks;
}

// Zwraca jedną książkę po ISBN z linkami HATEOAS
function getBookByIsbn(isbn) {
  // 1. Walidacja formatu ISBN
  const { valid, error } = validateIsbn(isbn);
  if (!valid) {
    throw new Error(`validation error: ${error}`);
  }

  // 2. Pobranie książki z repozytorium
  const book = booksRepository.findByIsbn(isbn);

  if (!book) {
    throw new Error("Book not found");
  }

  // 3. Dodanie linków HATEOAS i zwrot
  return addBookLinks(book);
}

// Tworzy nową książkę
function createBook(bookData) {
  if (!bookData) {
    throw new Error("validation error: book data is required");
  }

  const { isbn, title, author, year, genre, availableCopies } = bookData;

  // --- Walidacja poszczególnych pól ---

  // ISBN
  let result = validateIsbn(isbn);
  if (!result.valid) {
    throw new Error(`validation error: ${result.error}`);
  }

  // title
  result = validateRequiredString(title);
  if (!result.valid) {
    throw new Error(`validation error: title - ${result.error}`);
  }

  // author
  result = validateRequiredString(author);
  if (!result.valid) {
    throw new Error(`validation error: author - ${result.error}`);
  }

  // genre
  result = validateRequiredString(genre);
  if (!result.valid) {
    throw new Error(`validation error: genre - ${result.error}`);
  }

  // year
  result = validateYear(year);
  if (!result.valid) {
    throw new Error(`validation error: year - ${result.error}`);
  }

  // availableCopies
  result = validatePositiveNumber(availableCopies);
  if (!result.valid) {
    throw new Error(`validation error: availableCopies - ${result.error}`);
  }

  // --- Biznes: czy książka o tym ISBN już istnieje? ---
  if (booksRepository.exists(String(isbn).trim())) {
    // tekst zawiera "already exists" -> później 409 w errorHandlerze
    throw new Error("Book with this ISBN already exists");
  }

  // --- Utworzenie nowego obiektu książki (normalizacja typów) ---
  const newBook = {
    isbn: String(isbn).trim(),
    title: String(title).trim(),
    author: String(author).trim(),
    genre: String(genre).trim(),
    year: Number(year),
    availableCopies: Number(availableCopies),
  };

  // Zapis w "bazie" (tablica w pamięci)
  const created = booksRepository.create(newBook);

  // Dodanie linków HATEOAS
  return addBookLinks(created);
}

// Aktualizuje istniejącą książkę
function updateBook(isbn, bookData) {
  // 1. Walidacja ISBN z URL
  const { valid, error } = validateIsbn(isbn);
  if (!valid) {
    throw new Error(`validation error: ${error}`);
  }

  if (!bookData) {
    throw new Error("validation error: book data is required");
  }

  const { title, author, year, genre, availableCopies } = bookData;

  // 2. Walidacja pól (PUT – wymagamy pełnych danych, tak jak przy create)

  let result = validateRequiredString(title);
  if (!result.valid) {
    throw new Error(`validation error: title - ${result.error}`);
  }

  result = validateRequiredString(author);
  if (!result.valid) {
    throw new Error(`validation error: author - ${result.error}`);
  }

  result = validateRequiredString(genre);
  if (!result.valid) {
    throw new Error(`validation error: genre - ${result.error}`);
  }

  result = validateYear(year);
  if (!result.valid) {
    throw new Error(`validation error: year - ${result.error}`);
  }

  result = validatePositiveNumber(availableCopies);
  if (!result.valid) {
    throw new Error(`validation error: availableCopies - ${result.error}`);
  }

  // 3. Sprawdzenie, czy książka istnieje
  const existing = booksRepository.findByIsbn(isbn);
  if (!existing) {
    throw new Error("Book not found");
  }

  // 4. Przygotowanie znormalizowanych danych do aktualizacji
  const updatedData = {
    title: String(title).trim(),
    author: String(author).trim(),
    genre: String(genre).trim(),
    year: Number(year),
    availableCopies: Number(availableCopies),
  };

  // 5. Aktualizacja w repozytorium
  const updated = booksRepository.update(isbn, updatedData);

  // 6. Dodanie linków HATEOAS
  return addBookLinks(updated);
}

// Usuwa książkę po ISBN
function deleteBook(isbn) {
  // 1. Walidacja ISBN
  const { valid, error } = validateIsbn(isbn);
  if (!valid) {
    throw new Error(`validation error: ${error}`);
  }

  // 2. Sprawdzenie, czy książka istnieje
  if (!booksRepository.exists(isbn)) {
    throw new Error("Book not found");
  }

  // 3. Usunięcie
  const deleted = booksRepository.deleteByIsbn(isbn);

  if (!deleted) {
    // Teoretycznie nie powinno się zdarzyć po exists, ale zabezpieczenie
    throw new Error("Book not found");
  }

  // Zgodnie ze specyfikacją deleteBook ma zwrócić true
  return true;
}

module.exports = {
  getAllBooks,
  getBookByIsbn,
  createBook,
  updateBook,
  deleteBook,
};
