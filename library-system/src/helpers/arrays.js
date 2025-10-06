function swapElements([el1, el2]) {
  return [el2, el1];
}

function mergeArrays(...arrays) {
  return [].concat(...arrays);
}

function uniqueValues(array) {
  return [...new Set(array)];
}
