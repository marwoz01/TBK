String.prototype.reverse = function () {
  return this.split("").reverse().join("");
};
// console.log("kot".reverse());

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
// console.log("kot".capitalize());

String.prototype.truncate = function (length) {
  return this.length > length ? this.slice(0, length) + "..." : this.toString();
};
// console.log("Ala ma kota".truncate(7));
