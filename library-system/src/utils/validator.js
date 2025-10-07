// src/utils/validator.js
export class Validator {
  static isValidISBN(isbn) {
    return typeof isbn === "string" && /^\d{13}$/.test(isbn);
  }

  static isValidEmail(email) {
    return (
      typeof email === "string" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    );
  }

  static isValidYear(year) {
    const y = Number(year);
    const currentYear = new Date().getFullYear();
    return Number.isInteger(y) && y >= 1000 && y <= currentYear;
  }

  static isValidPageCount(pages) {
    return Number.isInteger(pages) && pages > 0;
  }

  // pomocnicze dla Book.isValidBook:
  static isString(v) {
    return typeof v === "string" && v.trim().length > 0;
  }
  static isPositiveNumber(v) {
    return Number.isFinite(v) && v > 0;
  }
}
