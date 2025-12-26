const PREF_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

const COOKIE_NAMES = {
  signedUserId: "uid",
  theme: "theme",
  language: "lang",
};

function setPreferenceCookies(res, { theme, language }) {
  if (theme !== undefined) {
    res.cookie(COOKIE_NAMES.theme, theme, {
      maxAge: PREF_MAX_AGE_MS,
      httpOnly: false,
      sameSite: "lax",
    });
  }

  if (language !== undefined) {
    res.cookie(COOKIE_NAMES.language, language, {
      maxAge: PREF_MAX_AGE_MS,
      httpOnly: false,
      sameSite: "lax",
    });
  }
}

function setSignedUserIdCookie(res, userId) {
  res.cookie(COOKIE_NAMES.signedUserId, String(userId), {
    signed: true,
    httpOnly: true,
    sameSite: "lax",
  });
}

function readPreferenceCookies(req) {
  return {
    theme: req.cookies?.[COOKIE_NAMES.theme],
    language: req.cookies?.[COOKIE_NAMES.language],
  };
}

function readSignedUserId(req) {
  const val = req.signedCookies?.[COOKIE_NAMES.signedUserId];
  if (!val) return null;
  const id = Number(val);
  return Number.isFinite(id) ? id : null;
}

function clearAuthCookies(res) {
  const opts = { path: "/" };

  res.clearCookie(COOKIE_NAMES.signedUserId, opts);
  res.clearCookie(COOKIE_NAMES.theme, opts);
  res.clearCookie(COOKIE_NAMES.language, opts);
}

module.exports = {
  COOKIE_NAMES,
  setPreferenceCookies,
  setSignedUserIdCookie,
  readPreferenceCookies,
  readSignedUserId,
  clearAuthCookies,
};
