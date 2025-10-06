class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
    this.users = [];
    this.loans = [];
    this.maxBooksPerUser = 5;
  }

  // Gettery
  get totalBooks() {
    return this.books.length;
  }

  get availableBooks() {
    return this.books.filter((book) => book.isAvailable).length;
  }

  get statistics() {
    return {
      totalBooks: this.totalBooks,
      availableBooks: this.availableBooks,
      totalUsers: this.users.length,
      totalLoans: this.loans.length,
    };
  }

  // Metody do zarządzania książkami
  addBook({ title, author, publicationYear, genre, isbn, totalCopies = 1 }) {
    const book = new Book({
      title,
      author,
      publicationYear,
      genre,
      isbn,
      totalCopies,
    });
    this.books.push(book);
    return book;
  }

  removeBook(isbn) {
    const index = this.books.findIndex((book) => book.isbn === isbn);
    if (index !== -1) {
      return this.books.splice(index, 1)[0];
    }
    return null;
  }

  findBookByISBN(isbn) {
    return this.books.find((book) => book.isbn === isbn);
  }

  findBooksByAuthor(author) {
    return this.books.filter((book) =>
      book.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  findBooksByGenre(genre) {
    return this.books.filter(
      (book) => book.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  updateBook(isbn, updates) {
    const book = this.findBookByISBN(isbn);
    if (book) {
      Object.assign(book, { ...updates });
      return book;
    }
    return null;
  }

  // Metody do zarządzania użytkownikami
  registerUser({ name, email } = { name: "Anonim", email: "brak@mail.com" }) {
    const user = new User(name, email);
    this.users.push(user);
    return user;
  }

  removeUser(email) {
    const index = this.users.findIndex((user) => user.email === email);
    if (index !== -1) {
      return this.users.splice(index, 1)[0];
    }
    return null;
  }

  findUserByEmail(email) {
    return this.users.find((user) => user.email === email);
  }

  updateUser(email, updates) {
    const user = this.findUserByEmail(email);
    if (user) {
      Object.assign(user, updates);
      return user;
    }
    return null;
  }

  // Metody wypożyczeń
  borrowBook(userEmail, isbn) {
    const user = this.findUserByEmail(userEmail);
    const book = this.findBookByISBN(isbn);

    const borrowDate = new Date();
    const dueDate = DateUtils.addDays(borrowDate, 14);

    book.borrow();
    user.addBorrowedBook(isbn, book.title);
    user.borrowHistory.push({ isbn, bookTitle: book.title, borrowDate });

    this.loans.push({ userEmail, isbn, borrowDate, dueDate });

    return { userEmail, isbn, borrowDate, dueDate };
  }

  returnBook(userEmail, isbn) {
    const user = this.findUserByEmail(userEmail);
    const book = this.findBookByISBN(isbn);

    book.return();
    user.removeBorrowedBook(isbn);

    user.borrowHistory.push({
      isbn,
      bookTitle: book.title,
      returnDate: new Date(),
    });

    return book;
  }

  getUserLoans(userEmail) {
    return this.loans.filter((loan) => loan.userEmail === userEmail);
  }

  getOverdueLoans(days) {
    const now = Date.now();
    return this.loans.filter(
      (loan) => (now - loan.borrowDate) / (1000 * 60 * 60 * 24) > days
    );
  }

  getPopularBooks(limit) {
    const sorted = [...this.books].sort(
      (a, b) => b.borrowedCopies - a.borrowedCopies
    );
    return sorted.slice(0, limit);
  }

  getActiveUsers(limit) {
    const sorted = [...this.users].sort(
      (a, b) => b.borrowHistory.length - a.borrowHistory.length
    );
    return sorted.slice(0, limit);
  }

  generateReport() {
    const totalTitles = this.books.length;
    const totalCopies = this.books.reduce((sum, b) => sum + b.totalCopies, 0);
    const availableCopies = this.books.reduce(
      (sum, b) => sum + (b.totalCopies - b.borrowedCopies),
      0
    );
    const totalUsers = this.users.length;
    const activeLoans = this.loans.length;

    const topBooks = [...this.books]
      .sort((a, b) => b.borrowedCopies - a.borrowedCopies)
      .slice(0, 5)
      .map((b) => ({
        title: b.title,
        isbn: b.isbn,
        borrowedCopies: b.borrowedCopies,
      }));

    const topUsers = [...this.users]
      .sort((a, b) => b.borrowHistory.length - a.borrowHistory.length)
      .slice(0, 5)
      .map((u) => ({
        name: u.name,
        email: u.email,
        borrows: u.borrowHistory.length,
      }));

    return {
      library: this.name,
      totals: {
        titles: totalTitles,
        copies: totalCopies,
        available: availableCopies,
        users: totalUsers,
        activeLoans,
      },
      top: {
        books: topBooks,
        users: topUsers,
      },
    };
  }
}
