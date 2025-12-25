function errorHandler(err, req, res, next) {
  const msg = (
    err && err.message ? err.message : "Internal server error"
  ).toLowerCase();

  let status = 500;
  if (msg.includes("not found")) status = 404;
  else if (msg.includes("already exists")) status = 409;
  else if (msg.includes("validation") || msg.includes("invalid")) status = 400;

  res.status(status).json({
    error: err.message || "Internal server error",
    timestamp: new Date().toISOString(),
  });
}

module.exports = errorHandler;
