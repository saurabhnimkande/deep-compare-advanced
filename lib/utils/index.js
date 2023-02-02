"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeElementFromIndex = exports.isObject = void 0;
const isObject = object => {
  return object != null && typeof object === "object";
};
exports.isObject = isObject;
const removeElementFromIndex = (array, index) => {
  array.splice(index, 1);
  return array;
};
exports.removeElementFromIndex = removeElementFromIndex;