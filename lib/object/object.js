"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.objectCompare = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _index = require("../utils/index.js");
var _array = require("../array/array.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var objectCompare = function objectCompare(one, two, parentOne, parentTwo) {
  if (!(0, _index.isObject)(one) || !(0, _index.isObject)(two)) {
    return {
      status: false,
      result: {
        pathOne: "".concat(parentOne),
        valueOne: one,
        pathTwo: "".concat(parentTwo),
        valueTwo: two,
        reason: "Object Expected."
      }
    };
  }
  var oneKeys = Object.keys(one);
  var twoKeys = Object.keys(two);
  if (oneKeys.length !== twoKeys.length) {
    return {
      status: false,
      result: {
        pathOne: "".concat(parentOne),
        valueOne: one,
        pathTwo: "".concat(parentTwo),
        valueTwo: two,
        reason: "Object length does not match."
      }
    };
  } else {
    for (var keys in one) {
      var value1 = one[keys];
      var value2 = two[keys];
      var checkObjects = (0, _index.isObject)(value1) && (0, _index.isObject)(value2);
      var checkArrays = Array.isArray(value1) && Array.isArray(value2);
      var mergeParent1 = "".concat(parentOne, ".").concat(keys);
      var mergeParent2 = "".concat(parentTwo, ".").concat(keys);
      var resultObject = checkObjects && !checkArrays && objectCompare(value1, value2, mergeParent1, mergeParent2);
      var resultArrays = checkArrays && (0, _array.arrayCompare)(value1, value2, mergeParent1, mergeParent2);
      if (checkArrays && !(resultArrays !== null && resultArrays !== void 0 && resultArrays.status)) {
        return {
          status: false,
          result: _objectSpread({}, resultArrays === null || resultArrays === void 0 ? void 0 : resultArrays.result)
        };
      } else if (checkObjects && !checkArrays && !(resultObject !== null && resultObject !== void 0 && resultObject.status)) {
        return {
          status: false,
          result: _objectSpread({}, resultObject === null || resultObject === void 0 ? void 0 : resultObject.result)
        };
      } else if (!checkObjects && !checkArrays && value1 !== value2) {
        return {
          status: false,
          result: {
            pathOne: mergeParent1,
            valueOne: value1,
            pathTwo: mergeParent2,
            valueTwo: value2,
            reason: "Values mismatch path1 ".concat(mergeParent1, " value \"").concat(one[keys], "\", path2 ").concat(mergeParent2, " value \"").concat(two[keys], "\".")
          }
        };
      }
    }
    return {
      status: true,
      result: {}
    };
  }
};
exports.objectCompare = objectCompare;