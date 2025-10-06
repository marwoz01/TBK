// src/index.js

// 1) Prototypy (muszą być załadowane „dla efektu ubocznego”)
import "./prototypes/string.js";
import "./prototypes/array.js";

// 2) Helpery
import { swapElements, mergeArrays } from "./helpers/arrays.js";
import { extendObject } from "./helpers/objects.js";
import { createBook, createUser } from "./helpers/factories.js";

// 3) Modele
import { Library } from "./models/library.js";

// Inicjalizacja biblioteki
const library = new Library("Biblioteka Miejska");

// Dodawanie książek — zapisz zwroty do zmiennych, żeby użyć później
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
console.log("STATISTICS:", library.statistics);
console.log("REPORT:", library.generateReport());

// Zwrot książki
library.returnBook("jan.kowalski@example.com", "9788324589456");

// Testy prototypów (String / Array)
const title = "władca pierścieni";
console.log(title.capitalize()); // "Władca pierścieni"
console.log(title.reverse());

const numbers = [1, 2, 3, 4, 5];
console.log(numbers.myEvery((n) => n > 0)); // true
console.log(numbers.myFilter((n) => n % 2 === 0)); // [2, 4]

// Testy funkcji pomocniczych
const [book1, book2] = swapElements([tolkienBook, orwellBook]);
console.log("SWAP:", book1.title, "<->", book2.title);

const allBooks = mergeArrays(fantasyBooks, dystopiaBooks);
console.log("MERGED COUNT:", allBooks.length);

const extended = extendObject(book1, { genre: "Epic Fantasy" });
console.log("EXTENDED GENRE:", extended.genre);
