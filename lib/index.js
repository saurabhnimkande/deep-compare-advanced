"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepCompare = void 0;
var _array = require("./array/array.js");
var _object = require("./object/object.js");
var _index = require("./utils/index.js");
const deepCompare = (one, two) => {
  try {
    if (Array.isArray(one) && Array.isArray(two)) {
      return (0, _array.arrayCompare)(one, two, "Array1", "Array2");
    } else if ((0, _index.isObject)(one) && (0, _index.isObject)(two) && !Array.isArray(one) && !Array.isArray(two)) {
      return (0, _object.objectCompare)(one, two, "Object1", "Object2");
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
  } catch (e) {
    return e;
  }
};
exports.deepCompare = deepCompare;