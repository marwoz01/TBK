export function swapElements([el1, el2]) {
  return [el2, el1];
}

export function mergeArrays(...arrays) {
  return arrays.flat();
}

export function uniqueValues(array) {
  return [...new Set(array)];
}

// console.log(swapElements(["A", "B"]));
// console.log(mergeArrays([1, 2], [3, 4], [5]));
// console.log(uniqueValues([1, 2, 2, 3, 1, 4]));
