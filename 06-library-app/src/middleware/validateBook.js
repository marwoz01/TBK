function validateBook(req, res, next) {
  const requiredFields = [
    "isbn",
    "title",
    "author",
    "year",
    "genre",
    "availableCopies",
  ];

  for (const field of requiredFields) {
    if (
      !Object.prototype.hasOwnProperty.call(req.body, field) ||
      req.body[field] === undefined
    ) {
      return res.status(400).json({
        error: "Validation failed",
        details: `Missing required field: ${field}`,
      });
    }
  }

  next();
}

module.exports = validateBook;
