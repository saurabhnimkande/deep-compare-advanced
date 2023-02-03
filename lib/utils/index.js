"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeElementFromIndex = exports.isObject = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var isObject = function isObject(object) {
  return object != null && (0, _typeof2["default"])(object) === "object";
};
exports.isObject = isObject;
var removeElementFromIndex = function removeElementFromIndex(array, index) {
  array.splice(index, 1);
  return array;
};
exports.removeElementFromIndex = removeElementFromIndex;