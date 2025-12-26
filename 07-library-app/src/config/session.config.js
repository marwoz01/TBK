const session = require("express-session");
const cookieParser = require("cookie-parser");

const cookieSecret = process.env.COOKIE_SECRET || "dev_cookie_secret_change_me";
const sessionSecret =
  process.env.SESSION_SECRET || "dev_session_secret_change_me";

const sessionOptions = {
  name: "library.sid",
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 1000,
    httpOnly: true,
  },
};

module.exports = {
  cookieSecret,
  sessionSecret,
  cookieParserMiddleware: cookieParser(cookieSecret),
  sessionMiddleware: session(sessionOptions),
  sessionOptions,
};
