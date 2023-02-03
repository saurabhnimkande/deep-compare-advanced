"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepCompare = void 0;
var _array = require("./array/array.js");
var _strictArrayCheck = require("./array/strictArrayCheck.js");
var _object = require("./object/object.js");
var _strictObjectCheck = require("./object/strictObjectCheck.js");
var _index = require("./utils/index.js");
var deepCompare = function deepCompare(one, two) {
  var strictCheck = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var entityOneName = arguments.length > 3 ? arguments[3] : undefined;
  var entityTwoName = arguments.length > 4 ? arguments[4] : undefined;
  try {
    if (strictCheck) {
      if (Array.isArray(one) && Array.isArray(two)) {
        return (0, _strictArrayCheck.strictArrayCompare)(one, two, entityOneName || "Array1", entityTwoName || "Array2");
      } else if ((0, _index.isObject)(one) && (0, _index.isObject)(two) && !Array.isArray(one) && !Array.isArray(two)) {
        return (0, _strictObjectCheck.strictObjectCompare)(one, two, entityOneName || "Object1", entityTwoName || "Object2");
      } else {
        return {
          status: false,
          result: {
            pathOne: "DataType1",
            valueOne: one,
            pathTwo: "Datatype2",
            valueTwo: two,
            reason: "Please provide same datatypes to compare"
          }
        };
      }
    } else {
      if (Array.isArray(one) && Array.isArray(two)) {
        return (0, _array.arrayCompare)(one, two, entityOneName || "Array1", entityTwoName || "Array2");
      } else if ((0, _index.isObject)(one) && (0, _index.isObject)(two) && !Array.isArray(one) && !Array.isArray(two)) {
        return (0, _object.objectCompare)(one, two, entityOneName || "Object1", entityTwoName || "Object2");
      } else {
        return {
          status: false,
          result: {
            pathOne: "DataType1",
            valueOne: one,
            pathTwo: "Datatype2",
            valueTwo: two,
            reason: "Please provide same datatypes to compare"
          }
        };
      }
    }
  } catch (e) {
    return e;
  }
};
exports.deepCompare = deepCompare;