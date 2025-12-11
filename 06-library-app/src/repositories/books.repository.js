const books = [
  {
    isbn: "9788324631766",
    title: "Clean Code",
    author: "Robert C. Martin",
    year: 2008,
    genre: "Programming",
    availableCopies: 3,
  },
  {
    isbn: "9780132350884",
    title: "Clean Architecture",
    author: "Robert C. Martin",
    year: 2017,
    genre: "Programming",
    availableCopies: 2,
  },
  {
    isbn: "9788381881537",
    title: "Wiedźmin: Ostatnie życzenie",
    author: "Andrzej Sapkowski",
    year: 1993,
    genre: "Fantastyka",
    availableCopies: 5,
  },
];

// Zwraca wszystkie książki
function findAll() {
  return books;
}

// Zwraca książkę po ISBN lub null
function findByIsbn(isbn) {
  const book = books.find((b) => b.isbn === isbn);
  return book || null;
}

// Dodaje książkę i ją zwraca
function create(book) {
  books.push(book);
  return book;
}

// Aktualizuje książkę po ISBN, zwraca zaktualizowaną lub null
function update(isbn, bookData) {
  const index = books.findIndex((b) => b.isbn === isbn);

  if (index === -1) {
    return null;
  }

  const updatedBook = {
    ...books[index],
    ...bookData,
    isbn,
  };

  books[index] = updatedBook;
  return updatedBook;
}

// Usuwa książkę po ISBN, zwraca true/false
function deleteByIsbn(isbn) {
  const index = books.findIndex((b) => b.isbn === isbn);

  if (index === -1) {
    return false;
  }

  books.splice(index, 1);
  return true;
}

// Sprawdza, czy książka istnieje
function exists(isbn) {
  return books.some((b) => b.isbn === isbn);
}

module.exports = {
  findAll,
  findByIsbn,
  create,
  update,
  deleteByIsbn,
  exists,
};
