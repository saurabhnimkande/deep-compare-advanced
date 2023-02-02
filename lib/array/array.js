"use strict";

require("core-js/modules/es.symbol.description.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayCompare = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _index = require("../utils/index.js");
var _object = require("../object/object.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const arrayCompare = (one, two, parentOne, parentTwo) => {
  if (!Array.isArray(one) || !Array.isArray(two)) {
    return {
      status: false,
      result: {
        pathOne: "".concat(parentOne),
        valueOne: one,
        pathTwo: "".concat(parentTwo),
        valueTwo: two,
        reason: "Array Expected."
      }
    };
  }
  if ((one === null || one === void 0 ? void 0 : one.length) !== (two === null || two === void 0 ? void 0 : two.length)) {
    return {
      status: false,
      result: {
        pathOne: "".concat(parentOne),
        valueOne: one,
        pathTwo: "".concat(parentTwo),
        valueTwo: two,
        reason: "Array length does not match."
      }
    };
  } else {
    let length = one === null || one === void 0 ? void 0 : one.length;
    let copyTwo = [...two];
    for (let i = 0; i < length; i++) {
      let oneData = one === null || one === void 0 ? void 0 : one[i];
      let count = 0;
      let errorData = {};
      for (let j = 0; j < ((_copyTwo = copyTwo) === null || _copyTwo === void 0 ? void 0 : _copyTwo.length); j++) {
        var _copyTwo, _copyTwo2;
        let twoData = (_copyTwo2 = copyTwo) === null || _copyTwo2 === void 0 ? void 0 : _copyTwo2[j];
        const checkObjects = (0, _index.isObject)(oneData) && (0, _index.isObject)(twoData);
        const checkArrays = Array.isArray(oneData) && Array.isArray(twoData);
        let mergeParent1 = "".concat(parentOne, "[").concat(i, "]");
        let mergeParent2 = "".concat(parentTwo, "[").concat(j, "]");
        let resultObject = checkObjects && !checkArrays && (0, _object.objectCompare)(oneData, twoData, mergeParent1, mergeParent2);
        let resultArray = checkArrays && arrayCompare(oneData, twoData, mergeParent1, mergeParent2);
        if (checkArrays && !(resultArray !== null && resultArray !== void 0 && resultArray.status)) {
          errorData = {
            status: false,
            result: _objectSpread({}, resultArray === null || resultArray === void 0 ? void 0 : resultArray.result)
          };
        } else if (checkObjects && !checkArrays && !(resultObject !== null && resultObject !== void 0 && resultObject.status)) {
          errorData = {
            status: false,
            result: _objectSpread({}, resultObject === null || resultObject === void 0 ? void 0 : resultObject.result)
          };
        } else if (!checkObjects && !checkArrays && oneData !== twoData) {
          count++;
        } else {
          errorData = {};
          copyTwo = (0, _index.removeElementFromIndex)(copyTwo, j);
          break;
        }
      }
      if (count === (two === null || two === void 0 ? void 0 : two.length)) {
        return {
          status: false,
          result: {
            pathOne: parentOne,
            valueOne: one,
            pathTwo: parentTwo,
            valueTwo: two,
            reason: "Values mismatch path1 ".concat(parentOne, " path2 ").concat(parentTwo, ".")
          }
        };
      }
      if ((Object === null || Object === void 0 ? void 0 : Object.keys(errorData).length) > 0) {
        return errorData;
      }
    }
    if (copyTwo.length > 0) {
      return {
        status: false,
        result: {
          pathOne: parentOne,
          valueOne: one,
          pathTwo: parentTwo,
          valueTwo: two,
          reason: "Values mismatch path1 ".concat(parentOne, " path2 ").concat(parentTwo, ".")
        }
      };
    } else {
      return {
        status: true,
        result: {}
      };
    }
  }
};
exports.arrayCompare = arrayCompare;