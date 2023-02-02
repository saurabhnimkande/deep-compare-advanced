"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strictObjectCompare = void 0;
require("core-js/modules/es.symbol.description.js");
var _index = require("../utils/index.js");
var _strictArrayCheck = require("../array/strictArrayCheck.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const strictObjectCompare = (one, two, parentOne, parentTwo) => {
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
  let oneKeys = Object.keys(one);
  let twoKeys = Object.keys(two);
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
    for (let keys in one) {
      let value1 = one[keys];
      let value2 = two[keys];
      const checkObjects = (0, _index.isObject)(value1) && (0, _index.isObject)(value2);
      const checkArrays = Array.isArray(value1) && Array.isArray(value2);
      let mergeParent1 = "".concat(parentOne, ".").concat(keys);
      let mergeParent2 = "".concat(parentTwo, ".").concat(keys);
      let resultObject = checkObjects && !checkArrays && strictObjectCompare(value1, value2, mergeParent1, mergeParent2);
      let resultArrays = checkArrays && (0, _strictArrayCheck.strictArrayCompare)(value1, value2, mergeParent1, mergeParent2);
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
exports.strictObjectCompare = strictObjectCompare;