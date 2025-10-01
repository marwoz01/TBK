class Book {
  constructor(
    title,
    author,
    isbn,
    publicationYear,
    totalCopies,
    borrowedCopies,
    genre
  ) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.publicationYear = publicationYear;
    this.totalCopies = totalCopies;
    this.borrowedCopies = borrowedCopies;
    this.genre = genre;
  }

  get availableCopies() {
    return this.totalCopies - this.borrowedCopies;
  }

  get isAvailable() {
    return this.availableCopies > 0;
  }

  get info() {
    return `${this.title} by ${this.author} (${this.publicationYear}) - Genre: ${this.genre}, ISBN: ${this.isbn}, Available Copies: ${this.availableCopies}/${this.totalCopies}`;
  }

  get age() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.publicationYear;
  }

  set copies({ total, borrowed }) {
    if (total < borrowed) {
      throw new Error("Total copies cannot be less than borrowed copies.");
    }
    this.totalCopies = total;
    this.borrowedCopies = borrowed;
  }

  set details({ title, author, genre }) {
    if (title) this.title = title;
    if (author) this.author = author;
    if (genre) this.genre = genre;
  }

  borrow() {
    if (this.isAvailable) {
      this.borrowedCopies += 1;
    } else {
      throw new Error("No available copies to borrow.");
    }
  }

  returnBook() {
    if (this.borrowedCopies > 0) {
      this.borrowedCopies -= 1;
    } else {
      throw new Error("No borrowed copies to return.");
    }
  }

  getFormattedInfo() {
    return `Title: ${this.title}\nAuthor: ${this.author}\nPublication Year: ${this.publicationYear}\nGenre: ${this.genre}\nISBN: ${this.isbn}\nAvailable Copies: ${this.availableCopies}/${this.totalCopies}`;
  }

  static isValidBook(bookData) {
    return (
      Validator.isString(bookData.title) &&
      Validator.isString(bookData.author) &&
      Validator.isNumber(bookData.publicationYear) &&
      Validator.isString(bookData.genre) &&
      Validator.isString(bookData.isbn) &&
      Validator.isPositiveNumber(bookData.totalCopies)
    );
  }
}
