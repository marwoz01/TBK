class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.registrationDate = new Date();
    this.borrowedBooks = [];
    this.borrowHistory = [];
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
      borrowedBooks: this.borrowedBooks,
      borrowHistory: this.borrowHistory,
    };
  }

  // Settery
  set info({ name, email }) {
    if (name) this.name = name;
    if (email) this.email = email;
  }

  // Metody
  addBorrowedBook(isbn, bookTitle) {
    if (this.canBorrow) {
      this.borrowedBooks.push(isbn);
      this.borrowHistory.push({
        isbn,
        bookTitle,
        borrowDate: new Date(),
      });
    } else {
      throw new Error("User has reached the maximum borrow limit.");
    }
  }

  removeBorrowedBook(isbn) {
    if (this.borrowedBooks.includes(isbn)) {
      this.borrowedBooks = this.borrowedBooks.filter((b) => b !== isbn);
    } else {
      throw new Error("This book is not in the user's borrowed list.");
    }
  }

  getBorrowHistory() {
    return this.borrowHistory;
  }
}

User.prototype.getFormattedHistory = function () {
  return this.borrowHistory
    .map(
      (e) => `${e.bookTitle} (${e.isbn}) - ${e.borrowDate.toLocaleDateString()}`
    )
    .join("\n");
};

User.prototype.hasOverdueBooks = function (days) {
  const now = Date.now();
  return this.borrowHistory.some(
    (e) =>
      this.borrowedBooks.includes(e.isbn) &&
      (now - e.borrowDate) / (1000 * 60 * 60 * 24) > days
  );
};
