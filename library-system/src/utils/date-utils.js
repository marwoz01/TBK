export class DateUtils {
  static isLeapYear(year) {
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
  }

  static getDaysBetween(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffMs = Math.abs(d2 - d1);
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  }

  static formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }

  static addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + Number(days || 0));
    return d;
  }
}

// console.log(DateUtils.isLeapYear(1900));
// console.log(DateUtils.isLeapYear(2024));

// const date1 = "2025-01-01";
// const date2 = "2025-01-03";
// console.log(DateUtils.getDaysBetween(date1, date2));

// console.log(DateUtils.formatDate("2025-3-7"));

// console.log(DateUtils.addDays("2025-03-07", 5));
