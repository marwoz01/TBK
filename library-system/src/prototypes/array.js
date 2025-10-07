Array.prototype.myEvery = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this) === false) {
      return false;
    }
  }
  return true;
};

Array.prototype.myFilter = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

Array.prototype.groupBy = function (key) {
  const out = {};
  for (const item of this) {
    const k = typeof key === "function" ? key(item) : item?.[key];
    const bucket = k ?? "undefined";
    (out[bucket] ||= []).push(item);
  }
  return out;
};

Array.prototype.unique = function () {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (!result.includes(this[i])) {
      result.push(this[i]);
    }
  }
  return result;
};
