const booksRouter = require("./routes/books.routes");
const authRouter = require("./routes/auth.routes");

const express = require("express");
const app = express();

const requestLogger = require("./middleware/requestLogger");
const errorHandler = require("./middleware/errorHandler");

const {
  cookieParserMiddleware,
  sessionMiddleware,
} = require("./config/session.config");

app.use(express.json());

app.use(cookieParserMiddleware);
app.use(sessionMiddleware);

app.use(requestLogger);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.get("/api/session-test", (req, res) => {
  req.session.views = (req.session.views || 0) + 1;
  res.json({ views: req.session.views });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Library Management API",
    version: "1.0.0",
    endpoints: {
      books: "/api/books",
      auth: "/api/auth",
      health: "/api/health",
    },
    _links: {
      self: { href: "/api", method: "GET" },
      books: { href: "/api/books", method: "GET" },
    },
  });
});

app.use("/api/books", booksRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res
    .status(404)
    .json({ error: "Endpoint not found", availableEndpoints: "/api" });
});

app.use(errorHandler);

module.exports = app;
