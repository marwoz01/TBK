function sortBooksByYear(books, order = "asc") {
  const sorted = [...books].sort(
    (a, b) => a.publicationYear - b.publicationYear
  );
  return order === "asc" ? sorted : sorted.reverse();
}

function filterAvailableBooks(books) {
  return books.filter((book) => book.totalCopies > book.borrowedCopies);
}

function groupBooksByGenre(books) {
  const result = {};
  for (const book of books) {
    const genre = book.genre || "Nieznany";
    if (!result[genre]) {
      result[genre] = [];
    }
    result[genre].push(book);
  }
  return result;
}

function calculateStatistics(books, users, loans) {
  const titles = books.length;
  const copies = books.reduce((sum, b) => sum + (b.totalCopies || 0), 0);
  const borrowed = books.reduce((sum, b) => sum + (b.borrowedCopies || 0), 0);
  const available = copies - borrowed;

  const usersCount = users.length;
  const activeLoans = loans.length;

  const genres = books.reduce((acc, b) => {
    const g = b.genre || "Nieznany";
    acc[g] = (acc[g] || 0) + 1;
    return acc;
  }, {});

  const topGenre =
    Object.keys(genres).sort((a, b) => genres[b] - genres[a])[0] || null;

  return {
    totals: {
      titles,
      copies,
      borrowed,
      available,
      users: usersCount,
      activeLoans,
    },
    genres,
    topGenre,
    ratios: {
      utilization: copies ? +(borrowed / copies).toFixed(2) : 0,
    },
  };
}
