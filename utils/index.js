export const isObject = (object) => {
  return object != null && typeof object === "object";
};

export const removeElementFromIndex = (array, index) => {
  array.splice(index, 1);
  return array;
};
