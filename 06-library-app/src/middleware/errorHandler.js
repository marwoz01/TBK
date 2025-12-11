function errorHandler(err, req, res, next) {
  console.error("Error handler:", err);

  const message =
    err && err.message ? String(err.message) : "Internal server error";
  const lower = message.toLowerCase();

  let status = 500;

  if (lower.includes("not found")) {
    status = 404;
  } else if (lower.includes("already exists")) {
    status = 409;
  } else if (lower.includes("validation") || lower.includes("invalid")) {
    status = 400;
  }

  res.status(status).json({
    error: message,
    timestamp: new Date().toISOString(),
  });
}

module.exports = errorHandler;
