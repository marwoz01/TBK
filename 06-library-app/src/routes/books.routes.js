// src/routes/books.routes.js

const express = require("express");
const router = express.Router();

const booksController = require("../controllers/books.controller");
const validateBook = require("../middleware/validateBook");

// GET /api/books
router.get("/", booksController.getAllBooks);

// GET /api/books/:isbn
router.get("/:isbn", booksController.getBookByIsbn);

// POST /api/books
router.post("/", validateBook, booksController.createBook);

// PUT /api/books/:isbn
router.put("/:isbn", validateBook, booksController.updateBook);

// DELETE /api/books/:isbn
router.delete("/:isbn", booksController.deleteBook);

module.exports = router;
