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
}
