"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayCompare = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _index = require("../utils/index.js");
var _object = require("../object/object.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var arrayCompare = function arrayCompare(one, two, parentOne, parentTwo) {
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
    var length = one === null || one === void 0 ? void 0 : one.length;
    var copyTwo = (0, _toConsumableArray2["default"])(two);
    for (var i = 0; i < length; i++) {
      var oneData = one === null || one === void 0 ? void 0 : one[i];
      var count = 0;
      var errorData = {};
      for (var j = 0; j < ((_copyTwo = copyTwo) === null || _copyTwo === void 0 ? void 0 : _copyTwo.length); j++) {
        var _copyTwo, _copyTwo2;
        var twoData = (_copyTwo2 = copyTwo) === null || _copyTwo2 === void 0 ? void 0 : _copyTwo2[j];
        var checkObjects = (0, _index.isObject)(oneData) && (0, _index.isObject)(twoData);
        var checkArrays = Array.isArray(oneData) && Array.isArray(twoData);
        var mergeParent1 = "".concat(parentOne, "[").concat(i, "]");
        var mergeParent2 = "".concat(parentTwo, "[").concat(j, "]");
        var resultObject = checkObjects && !checkArrays && (0, _object.objectCompare)(oneData, twoData, mergeParent1, mergeParent2);
        var resultArray = checkArrays && arrayCompare(oneData, twoData, mergeParent1, mergeParent2);
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