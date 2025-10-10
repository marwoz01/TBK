import { Validator } from "../utils/validator.js";
 
export class Book {
  constructor({
    title,
    author,
    isbn,
    publicationYear,
    totalCopies,
    borrowedCopies = 0,
    genre,
  }) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.publicationYear = publicationYear;
    this.totalCopies = totalCopies;
    this.borrowedCopies = borrowedCopies ?? 0;
    this.genre = genre;
  }

  // Gettery
  get availableCopies() {
    return this.totalCopies - this.borrowedCopies;
  }

  get isAvailable() {
    return this.availableCopies > 0;
  }

  get info() {
    return `${this.title} by ${this.author} (${this.publicationYear}) - Genre: ${this.genre}, ISBN: ${this.isbn}, Available: ${this.availableCopies}/${this.totalCopies}`;
  }

  get age() {
    return new Date().getFullYear() - this.publicationYear;
  }

  // Settery
  set copies({ total, borrowed }) {
    if (
      typeof total === "number" &&
      typeof borrowed === "number" &&
      total < borrowed
    ) {
      throw new Error("Total copies cannot be less than borrowed copies.");
    }
    if (typeof total === "number") this.totalCopies = total;
    if (typeof borrowed === "number") this.borrowedCopies = borrowed;
  }

  set details({ title, author, genre }) {
    if (title) this.title = title;
    if (author) this.author = author;
    if (genre) this.genre = genre;
  }

  // Metody
  borrow() {
    if (!this.isAvailable) throw new Error("No available copies to borrow.");
    this.borrowedCopies += 1;
    return true;
  }

  return() {
    if (this.borrowedCopies <= 0)
      throw new Error("No borrowed copies to return.");
    this.borrowedCopies -= 1;
    return true;
  }

  returnBook() {
    return this.return();
  }

  getFormattedInfo() {
    return [
      `Title: ${this.title}`,
      `Author: ${this.author}`,
      `ISBN: ${this.isbn}`,
      `Publication Year: ${this.publicationYear}`,
      `Genre: ${this.genre}`,
      `Total Copies: ${this.totalCopies}`,
      `Borrowed Copies: ${this.borrowedCopies}`,
      `Available Copies: ${this.availableCopies}`,
    ].join("\n");
  }

  // Statyczne metody
  static isValidBook(bookData) {
    const { title, author, isbn, publicationYear, totalCopies, genre } =
      bookData || {};
    return (
      Validator.isString(title) &&
      Validator.isString(author) &&
      Validator.isValidISBN(isbn) &&
      Validator.isValidYear(publicationYear) &&
      Validator.isPositiveNumber(totalCopies) &&
      Validator.isString(genre)
    );
  }

  static compareByYear(book1, book2) {
    return book1.publicationYear - book2.publicationYear;
  }
}

// const book = new Book({
//   title: "Hobbit",
//   author: "Tolkien",
//   isbn: "9788324589456",
//   publicationYear: 1937,
//   totalCopies: 5,
//   borrowedCopies: 2,
//   genre: "Fantasy",
// });

// console.log(book.availableCopies);
// console.log(book.isAvailable);
// console.log(book.info);
// console.log(book.age);

// book.copies = { total: 10, borrowed: 4 };
// console.log(book.availableCopies); // 6
// book.details = { title: "Władca Pierścieni", genre: "Epicka fantasy" };
// console.log(book.info);
// book.borrow();
// console.log(book.availableCopies);
// book.return();
// console.log(book.availableCopies);
// book.returnBook();
// console.log(book.availableCopies);
// console.log(book.getFormattedInfo());
// console.log(Book.isValidBook({ title: "Hobbit", author: "Tolkien", isbn: "9788324589456", publicationYear: 1937, totalCopies: 5, genre: "Fantasy" }));
// const book1 = new Book({ title: "Hobbit", author: "Tolkien", isbn: "9788324589456", publicationYear: 1937, totalCopies: 5, genre: "Fantasy" });
// const book2 = new Book({ title: "1984", author: "Orwell", isbn: "9788328708815", publicationYear: 1949, totalCopies: 3, genre: "Dystopia" });
// console.log(Book.compareByYear(book1, book2));
