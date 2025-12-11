// Tworzy pojedynczy link HATEOAS
function createLink(href, method, rel) {
  return { href, method, rel };
}

// Dodaje do książki pole _links z linkami HATEOAS
function addBookLinks(book) {
  const isbn = book.isbn;
  const selfHref = `/api/books/${isbn}`;

  return {
    ...book,
    _links: {
      self: createLink(selfHref, "GET", "self"),
      update: createLink(selfHref, "PUT", "update"),
      delete: createLink(selfHref, "DELETE", "delete"),
      collection: createLink("/api/books", "GET", "collection"),
    },
  };
}

// Linki dla kolekcji książek
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
