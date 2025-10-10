export function sortBooksByYear(books, order = "asc") {
  const dir = order === "desc" ? -1 : 1;
  return [...books].sort(
    (a, b) => dir * (a.publicationYear - b.publicationYear)
  );
}

export function filterAvailableBooks(books) {
  return books.filter((b) => b.isAvailable);
}

export function groupBooksByGenre(books) {
  return books.reduce((acc, b) => {
    (acc[b.genre] ||= []).push(b);
    return acc;
  }, {});
}

export function calculateStatistics(books, users, loans) {
  const totalBooks = books.reduce((s, b) => s + b.totalCopies, 0);
  const availableBooks = books.reduce((s, b) => s + b.availableCopies, 0);
  const totalUsers = users.length;
  const totalLoans = loans.length;

  const groupedByGenre = groupBooksByGenre(books);
  const mostPopularGenre =
    Object.entries(groupedByGenre).sort(
      (a, b) => b[1].length - a[1].length
    )[0]?.[0] ?? null;

  return {
    totalBooks,
    availableBooks,
    totalUsers,
    totalLoans,
    mostPopularGenre,
  };
}

// const books = [
//   {
//     title: "1984",
//     publicationYear: 1949,
//     genre: "Dystopia",
//     totalCopies: 2,
//     borrowedCopies: 1,
//     availableCopies: 1,
//     isAvailable: true,
//   },
//   {
//     title: "Hobbit",
//     publicationYear: 1937,
//     genre: "Fantasy",
//     totalCopies: 3,
//     borrowedCopies: 3,
//     availableCopies: 0,
//     isAvailable: false,
//   },
// ];

// console.log("sort asc", sortBooksByYear(books, "asc"));
// console.log("sort desc", sortBooksByYear(books, "desc"));
// console.log("available", filterAvailableBooks(books));
// console.log("by genre", groupBooksByGenre(books));

// const users = [{}, {}, {}];
// const loans = [{}, {}];
// console.log("stats", calculateStatistics(books, users, loans));
