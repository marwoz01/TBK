// Prototypy
import "./prototypes/string.js";
import "./prototypes/array.js";

// Modele/Utils/Helpery
import { Library } from "./models/library.js";
import { createBook, createUser } from "./helpers/factories.js";
import { swapElements, mergeArrays } from "./helpers/arrays.js";
import { extendObject } from "./helpers/objects.js";

// Inicjalizacja biblioteki
const library = new Library("Biblioteka Miejska");

// Dodawanie książek
const tolkienBook = library.addBook({
  title: "Władca Pierścieni",
  author: "J.R.R. Tolkien",
  isbn: "9788324589456",
  publicationYear: 1954,
  totalCopies: 3,
  genre: "Fantasy",
});

const orwellBook = library.addBook(
  createBook({
    title: "1984",
    author: "George Orwell",
    isbn: "9788328708815",
    publicationYear: 1949,
    totalCopies: 2,
    genre: "Dystopia",
  })
);

// Rejestracja użytkowników
library.registerUser({
  name: "Jan Kowalski",
  email: "jan.kowalski@example.com",
});

library.registerUser(
  createUser({
    name: "Anna Nowak",
    email: "anna.nowak@example.com",
  })
);

// Wypożyczenia
library.borrowBook("jan.kowalski@example.com", "9788324589456");
library.borrowBook("anna.nowak@example.com", "9788328708815");

// Wyszukiwanie
const tolkienBooks = library.findBooksByAuthor("Tolkien");
const fantasyBooks = library.findBooksByGenre("Fantasy");
const dystopiaBooks = library.findBooksByGenre("Dystopia");

// Statystyki
console.log(library.statistics);
console.log(library.generateReport());

// Zwrot książki
library.returnBook("jan.kowalski@example.com", "9788324589456");

// Testy prototypów
const title = "władca pierścieni";
console.log(title.capitalize()); // "Władca pierścieni"
console.log(title.reverse());

const numbers = [1, 2, 3, 4, 5];
console.log(numbers.myEvery((n) => n > 0)); // true
console.log(numbers.myFilter((n) => n % 2 === 0)); // [2, 4]

// Testy funkcji pomocniczych
const [book1, book2] = swapElements([tolkienBook, orwellBook]);
const allBooks = mergeArrays(fantasyBooks, dystopiaBooks);
const extended = extendObject(book1, { genre: "Epic Fantasy" });

// (opcjonalnie dla debugowania w DevTools)
window.library = library;
