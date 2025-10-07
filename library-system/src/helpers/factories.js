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

// console.log(
//   createBook({
//     title: "Hobbit",
//     author: "Tolkien",
//     isbn: "9788324589456",
//     publicationYear: 1937,
//     totalCopies: 3,
//     genre: "Fantasy",
//   })
// );

// console.log(
//   createUser({
//     name: "Jan Kowalski",
//     email: "jan.kowalski@example.com",
//   })
// );

// console.log(
//   createLoan({
//     userEmail: "jan.kowalski@example.com",
//     isbn: "9788324589456",
//     dueDate: new Date("2025-10-21"),
//   })
// );
