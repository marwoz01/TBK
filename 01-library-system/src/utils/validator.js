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
}

// console.log(Validator.isValidISBN("9781234567890"));
// console.log(Validator.isValidEmail("mail@gmail.com"));
// console.log(Validator.isValidYear(2020));
// console.log(Validator.isValidPageCount(100));
