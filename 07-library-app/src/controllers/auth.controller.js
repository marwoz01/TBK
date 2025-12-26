const authService = require("../services/auth.service");
const {
  setPreferenceCookies,
  setSignedUserIdCookie,
  readPreferenceCookies,
  clearAuthCookies,
} = require("../utils/cookieUtils");
const { sessionOptions } = require("../config/session.config");

function register(req, res, next) {
  try {
    const user = authService.register(req.body);
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    next(err);
  }
}

function login(req, res, next) {
  try {
    const user = authService.login(req.body);

    req.session.userId = user.id;
    req.session.role = user.role;

    setSignedUserIdCookie(res, user.id);
    setPreferenceCookies(res, user.preferences);

    res.json({ message: "Logged in", user });
  } catch (err) {
    next(err);
  }
}

function logout(req, res, next) {
  clearAuthCookies(res);
  res.clearCookie(sessionOptions?.name || "connect.sid");

  if (!req.session) return res.json({ message: "Logged out" });

  req.session.destroy((err) => {
    if (err) return next(err);
    res.json({ message: "Logged out" });
  });
}

function me(req, res, next) {
  try {
    const user = authService.getCurrentUserBySession(req.session);
    if (!user)
      return res.status(401).json({ error: "Unauthorized: login required" });

    const cookiePrefs = readPreferenceCookies(req);
    const dbPrefs = user.preferences || {};

    const effective = {
      theme: cookiePrefs.theme ?? dbPrefs.theme,
      language: cookiePrefs.language ?? dbPrefs.language,
    };

    res.json({
      user,
      preferences: {
        db: dbPrefs,
        cookies: cookiePrefs,
        effective,
      },
    });
  } catch (err) {
    next(err);
  }
}

function updatePreferences(req, res, next) {
  try {
    const userId = req.session?.userId;
    if (!userId)
      return res.status(401).json({ error: "Unauthorized: login required" });

    const updatedUser = authService.updatePreferences(userId, req.body);

    setPreferenceCookies(res, req.body);

    res.json({ message: "Preferences updated", user: updatedUser });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login,
  logout,
  me,
  updatePreferences,
};
