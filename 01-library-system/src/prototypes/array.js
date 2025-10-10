Array.prototype.myEvery = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (!callback(this[i], i, this)) return false;
  }
  return true;
};
// console.log([1, 2, 3].myEvery((n) => n > 0));
// console.log([1, 2, -1].myEvery((n) => n > 0));

Array.prototype.myFilter = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) result.push(this[i]);
  }
  return result;
};
// console.log([1, 2, 3, 4, 5].myFilter((n) => n % 2 === 0));

Array.prototype.groupBy = function (key) {
  const out = {};
  for (let i = 0; i < this.length; i++) {
    const k = this[i][key];
    if (!out[k]) {
      out[k] = [];
    }
    out[k].push(this[i]);
  }
  return out;
};
// const books = [
//   { title: "Hobbit", genre: "Fantasy" },
//   { title: "Władca Pierścieni", genre: "Fantasy" },
// ];
// console.log(books.groupBy("genre"));

Array.prototype.unique = function () {
  return [...new Set(this)];
};
// console.log([1, 1, 2, 3, 3].unique());
