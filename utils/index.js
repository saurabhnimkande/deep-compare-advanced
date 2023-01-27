export const isObject = (object) => {
  return object != null && typeof object === "object";
};

export const isArray = (array) => {
  return array != null && typeof array === "array";
};

export const removeElementFromIndex = (array, index) => {
  array.splice(index, 1);
  return array;
};
