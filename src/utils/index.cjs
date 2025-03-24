exports.isObject = (object) => {
  return object != null && typeof object === "object";
};

exports.removeElementFromIndex = (array, index) => {
  array.splice(index, 1);
  return array;
};
