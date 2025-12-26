const usersRepo = require("../repositories/users.repository");

function toPublicUser(user) {
  if (!user) return null;
  const { password, ...rest } = user;
  return rest;
}

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateMinLen(value, min, fieldName) {
  if (typeof value !== "string" || value.length < min) {
    const err = new Error(
      `${fieldName} must be at least ${min} characters long`
    );
    err.status = 400;
    throw err;
  }
}

function validateTheme(theme) {
  const allowed = ["light", "dark"];
  if (theme !== undefined && !allowed.includes(theme)) {
    const err = new Error(`theme must be one of: ${allowed.join(", ")}`);
    err.status = 400;
    throw err;
  }
}

function validateLanguage(language) {
  const allowed = ["pl", "en"];
  if (language !== undefined && !allowed.includes(language)) {
    const err = new Error(`language must be one of: ${allowed.join(", ")}`);
    err.status = 400;
    throw err;
  }
}

function register({ username, password, email }) {
  validateMinLen(username, 3, "username");
  validateMinLen(password, 4, "password");

  if (!isValidEmail(email)) {
    const err = new Error("email has invalid format");
    err.status = 400;
    throw err;
  }

  if (usersRepo.isUsernameTaken(username)) {
    const err = new Error("username is already taken");
    err.status = 409;
    throw err;
  }

  const user = usersRepo.create({
    username,
    password,
    email,
    role: "user",
    preferences: { theme: "light", language: "pl" },
  });

  return toPublicUser(user);
}

function login({ username, password }) {
  const user = usersRepo.findByUsername(username);
  if (!user || user.password !== password) {
    const err = new Error("invalid username or password");
    err.status = 401;
    throw err;
  }
  return toPublicUser(user);
}

function getCurrentUserBySession(session) {
  const userId = session?.userId;
  if (!userId) return null;
  const user = usersRepo.findById(userId);
  return toPublicUser(user);
}

function updatePreferences(userId, { theme, language }) {
  validateTheme(theme);
  validateLanguage(language);

  const user = usersRepo.update(userId, {
    preferences: {
      ...(theme !== undefined ? { theme } : {}),
      ...(language !== undefined ? { language } : {}),
    },
  });

  if (!user) {
    const err = new Error("user not found");
    err.status = 404;
    throw err;
  }

  return toPublicUser(user);
}

module.exports = {
  register,
  login,
  getCurrentUserBySession,
  updatePreferences,
};
