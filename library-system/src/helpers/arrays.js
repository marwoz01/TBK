export function swapElements([el1, el2]) {
  return [el2, el1];
}

export function mergeArrays(...arrays) {
  return arrays.flat();
}

export function uniqueValues(array) {
  return [...new Set(array)];
}
