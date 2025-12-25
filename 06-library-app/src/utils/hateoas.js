function createLink(href, method, rel) {
  return { href, method, rel };
}

function addBookLinks(book) {
  return {
    ...book,
    _links: {
      self: createLink(`/api/books/${book.isbn}`, "GET", "self"),
      update: createLink(`/api/books/${book.isbn}`, "PUT", "update"),
      delete: createLink(`/api/books/${book.isbn}`, "DELETE", "delete"),
      collection: createLink("/api/books", "GET", "collection"),
    },
  };
}

function addBooksCollectionLinks() {
  return {
    self: createLink("/api/books", "GET", "self"),
    create: createLink("/api/books", "POST", "create"),
  };
}

module.exports = {
  createLink,
  addBookLinks,
  addBooksCollectionLinks,
};
