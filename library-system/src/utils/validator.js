class Validator {
  isValidISBN(isbn) {
    if (isbn.length !== 13 || !/^\d+$/.test(isbn)) {
      return false;
    } else {
      return true;
    }
  }

  isVaildEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidYear(year) {
    const currentYear = new Date().getFullYear();
    return year > 0 && year <= currentYear;
  }
}
