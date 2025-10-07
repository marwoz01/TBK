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
