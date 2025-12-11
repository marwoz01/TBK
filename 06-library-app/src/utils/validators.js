// Walidacja ISBN: dokładnie 13 cyfr
function validateIsbn(isbn) {
  const value = String(isbn).trim();

  const isValid = /^\d{13}$/.test(value);

  return {
    valid: isValid,
    error: isValid ? null : "Invalid ISBN: must be exactly 13 digits",
  };
}

// Walidacja roku
function validateYear(year) {
  const currentYear = new Date().getFullYear();
  const num = Number(year);

  const isValid = Number.isInteger(num) && num >= 1000 && num <= currentYear;

  return {
    valid: isValid,
    error: isValid
      ? null
      : `Invalid year: must be between 1000 and ${currentYear}`,
  };
}

// Walidacja liczby dodatniej
function validatePositiveNumber(value) {
  const num = Number(value);

  const isValid = Number.isFinite(num) && num > 0;

  return {
    valid: isValid,
    error: isValid ? null : "Invalid number: must be greater than 0",
  };
}

// Walidacja wymaganego stringa
function validateRequiredString(value) {
  const str = String(value || "").trim();

  const isValid = str.length > 0;

  return {
    valid: isValid,
    error: isValid
      ? null
      : "Validation error: value is required and cannot be empty",
  };
}

module.exports = {
  validateIsbn,
  validateYear,
  validatePositiveNumber,
  validateRequiredString,
};
