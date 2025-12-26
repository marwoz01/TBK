function errorHandler(err, req, res, next) {
  const rawMsg = err?.message || "Internal server error";
  const msg = rawMsg.toLowerCase();

  let status = err?.status;

  if (!status) {
    status = 500;
    if (msg.includes("unauthorized") || msg.includes("login required"))
      status = 401;
    else if (msg.includes("forbidden") || msg.includes("admin only"))
      status = 403;
    else if (msg.includes("not found")) status = 404;
    else if (msg.includes("already exists") || msg.includes("already taken"))
      status = 409;
    else if (msg.includes("validation") || msg.includes("invalid"))
      status = 400;
  }

  console.error(err);

  res.status(status).json({
    error: rawMsg,
    timestamp: new Date().toISOString(),
  });
}

module.exports = errorHandler;
