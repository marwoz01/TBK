export function extendObject(obj1, obj2) {
  return { ...obj1, ...obj2 };
}

export function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function pickProperties(obj, keys) {
  const result = {};
  for (const key of keys) {
    if (key in obj) result[key] = obj[key];
  }
  return result;
}

// const book = { title: "Hobbit", author: "Tolkien" };
// const extra = { genre: "Fantasy", year: 1937 };
// console.log(extendObject(book, extra));

// const original = { title: "1984", author: { name: "Orwell" } };
// const copy = cloneObject(original);
// copy.author.name = "George Orwell";
// console.log(original.author.name);
// console.log(copy.author.name);

// const book2 = {
//   title: "Władca Pierścieni",
//   author: "Tolkien",
//   genre: "Fantasy",
//   year: 1954,
// };
// console.log(pickProperties(book2, ["title", "author"]));
