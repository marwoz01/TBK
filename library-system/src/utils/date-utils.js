class DateUtils {
  static isLeapYear(year) {
    if (year % 400 === 0) {
      return true;
    } else if (year % 4 === 0) {
      return true;
    } else {
      return false;
    }
  }

  static getDaysBetween(date1, date2) {
    return Math.floor(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  }

  static formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  static addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
