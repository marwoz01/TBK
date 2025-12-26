function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: "Unauthorized: login required" });
  }
  next();
}

function requireAdmin(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: "Unauthorized: login required" });
  }
  if (req.session.role !== "admin") {
    return res.status(403).json({ error: "Forbidden: admin only" });
  }
  next();
}

module.exports = {
  requireAuth,
  requireAdmin,
};
