const books = [
  {
    isbn: "9780140449136",
    title: "Odyseja",
    author: "Homer",
    year: 1996,
    genre: "Klasyka",
    availableCopies: 3,
  },
  {
    isbn: "9788373191724",
    title: "Wiedźmin: Ostatnie życzenie",
    author: "Andrzej Sapkowski",
    year: 1993,
    genre: "Fantastyka",
    availableCopies: 5,
  },
  {
    isbn: "9780307474278",
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    year: 2008,
    genre: "Kryminał",
    availableCopies: 2,
  },
  {
    isbn: "9780061120084",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    genre: "Klasyka",
    availableCopies: 4,
  },
  {
    isbn: "9780132350884",
    title: "Clean Code",
    author: "Robert C. Martin",
    year: 2008,
    genre: "Techniczne",
    availableCopies: 1,
  },
];

// Zwraca wszystkie książki
function findAll() {
  return [...books];
}

// Zwraca książkę po ISBN albo null
function findByIsbn(isbn) {
  return books.find((b) => b.isbn === isbn) || null;
}

// Dodaje nową książkę i zwraca ją
function create(book) {
  books.push(book);
  return book;
}

// Aktualizuje istniejącą książkę; zwraca zaktualizowaną albo null
function update(isbn, bookData) {
  const index = books.findIndex((b) => b.isbn === isbn);
  if (index === -1) return null;

  const updated = { ...books[index], ...bookData, isbn: books[index].isbn };
  books[index] = updated;
  return updated;
}

// Usuwa po ISBN; zwraca true/false
function deleteByIsbn(isbn) {
  const index = books.findIndex((b) => b.isbn === isbn);
  if (index === -1) return false;

  books.splice(index, 1);
  return true;
}

// Sprawdza istnienie po ISBN
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
