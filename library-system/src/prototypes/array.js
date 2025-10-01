Array.prototype.myEvery = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this) === false) {
      return false;
    }
  }
  return true;
};

console.log([1, 2, 3].myEvery((n) => n > 0));
console.log([1, 2, 3].myEvery((n) => n > 2));

Array.prototype.myFilter = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

console.log([1, 2, 3, 4].myFilter((n) => n % 2 === 0));

Array.prototype.groupBy = function (key) {
  const result = {};
  for (let i = 0; i < this.length; i++) {
    const groupKey = this[i][key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(this[i]);
  }
  return result;
};

console.log(
  [{ type: "dog" }, { type: "cat" }, { type: "dog" }].groupBy("type")
);

console.log(["one", "two", "three"].groupBy("length"));

Array.prototype.unique = function () {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (!result.includes(this[i])) {
      result.push(this[i]);
    }
  }
  return result;
};

console.log([1, 1, 2, 3, 3].unique());
console.log(["a", "a", "b"].unique());
