function validateIsbn(isbn) {
  const str = String(isbn);
  const ok = /^\d{13}$/.test(str);
  return ok
    ? { valid: true, error: "" }
    : { valid: false, error: "Invalid ISBN: must be exactly 13 digits" };
}

function validateYear(year) {
  const y = Number(year);
  const currentYear = new Date().getFullYear();
  const ok = Number.isInteger(y) && y >= 1000 && y <= currentYear;

  return ok
    ? { valid: true, error: "" }
    : {
        valid: false,
        error: `Invalid year: must be between 1000 and ${currentYear}`,
      };
}

function validatePositiveNumber(value) {
  const n = Number(value);
  const ok = Number.isFinite(n) && n > 0;
  return ok
    ? { valid: true, error: "" }
    : { valid: false, error: "Invalid number: must be greater than 0" };
}

function validateRequiredString(value) {
  const ok = typeof value === "string" && value.trim().length > 0;
  return ok
    ? { valid: true, error: "" }
    : { valid: false, error: "Invalid string: must be a non-empty string" };
}

module.exports = {
  validateIsbn,
  validateYear,
  validatePositiveNumber,
  validateRequiredString,
};
