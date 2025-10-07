export function createBook({
  title,
  author,
  isbn,
  publicationYear,
  totalCopies = 1,
  genre = "Inne",
}) {
  return {
    title,
    author,
    isbn,
    publicationYear,
    totalCopies,
    borrowedCopies: 0,
    genre,
  };
}

export function createUser({ name, email, registrationDate = new Date() }) {
  return {
    name,
    email,
    registrationDate,
    borrowedBooks: [],
    borrowHistory: [],
  };
}

export function createLoan({
  userEmail,
  isbn,
  borrowDate = new Date(),
  dueDate,
}) {
  return { userEmail, isbn, borrowDate, dueDate };
}
