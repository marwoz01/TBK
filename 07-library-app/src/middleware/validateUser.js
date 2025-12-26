function badRequest(res, details) {
  return res.status(400).json({ error: "Validation error", details });
}

function validateRegister(req, res, next) {
  const { username, password, email } = req.body || {};
  const details = [];

  if (!username) details.push("username is required");
  if (!password) details.push("password is required");
  if (!email) details.push("email is required");

  if (details.length) return badRequest(res, details);
  next();
}

function validateLogin(req, res, next) {
  const { username, password } = req.body || {};
  const details = [];

  if (!username) details.push("username is required");
  if (!password) details.push("password is required");

  if (details.length) return badRequest(res, details);
  next();
}

function validatePreferences(req, res, next) {
  const { theme, language } = req.body || {};
  const details = [];

  if (theme === undefined && language === undefined) {
    details.push("at least one of theme or language is required");
    return badRequest(res, details);
  }

  const allowedThemes = ["light", "dark"];
  const allowedLanguages = ["pl", "en"];

  if (theme !== undefined && !allowedThemes.includes(theme)) {
    details.push(`theme must be one of: ${allowedThemes.join(", ")}`);
  }

  if (language !== undefined && !allowedLanguages.includes(language)) {
    details.push(`language must be one of: ${allowedLanguages.join(", ")}`);
  }

  if (details.length) return badRequest(res, details);
  next();
}

module.exports = {
  validateRegister,
  validateLogin,
  validatePreferences,
};
