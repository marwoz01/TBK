import { Validator } from "../utils/validator.js";
import { DateUtils } from "../utils/date-utils.js";

export class User {
  constructor(
    name,
    email,
    registrationDate = new Date(),
    borrowedBooks = [],
    borrowHistory = []
  ) {
    this.name = name;
    this.email = email;
    this.registrationDate = registrationDate;
    this.borrowedBooks = borrowedBooks;
    this.borrowHistory = borrowHistory;
  }

  // Gettery
  get canBorrow() {
    return this.borrowedBooks.length < 5;
  }

  get borrowCount() {
    return this.borrowedBooks.length;
  }

  get profile() {
    return {
      name: this.name,
      email: this.email,
      registrationDate: this.registrationDate,
      borrowedBooks: [...this.borrowedBooks],
      borrowHistory: [...this.borrowHistory],
    };
  }

  // Setter
  set info({ name, email }) {
    if (name) this.name = name;
    if (email && Validator.isValidEmail(email)) this.email = email;
  }

  // Metody
  addBorrowedBook(isbn, bookTitle) {
    if (!this.canBorrow) {
      throw new Error("User has reached the maximum borrow limit.");
    }
    this.borrowedBooks.push(isbn);
    this.borrowHistory.push({
      isbn,
      bookTitle,
      borrowDate: new Date(),
    });
    return true;
  }

  removeBorrowedBook(isbn) {
    const idx = this.borrowedBooks.indexOf(isbn);
    if (idx === -1) {
      throw new Error("This book is not in the user's borrowed list.");
    }
    this.borrowedBooks.splice(idx, 1);
    return true;
  }

  getBorrowHistory() {
    return [...this.borrowHistory];
  }
}

// Rozszerzenia
User.prototype.getFormattedHistory = function () {
  return this.borrowHistory
    .map(
      (e) =>
        `${e.bookTitle} (ISBN: ${e.isbn}) borrowed on ${DateUtils.formatDate(
          e.borrowDate
        )}`
    )
    .join("\n");
};

User.prototype.hasOverdueBooks = function (days) {
  const now = new Date();
  return this.borrowHistory.some(
    (e) =>
      this.borrowedBooks.includes(e.isbn) &&
      DateUtils.getDaysBetween(e.borrowDate, now) > days
  );
};
