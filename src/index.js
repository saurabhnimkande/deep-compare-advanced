import { arrayCompare } from "./array/array.js";
import { strictArrayCompare } from "./array/strictArrayCheck.js";
import { objectCompare } from "./object/object.js";
import { strictObjectCompare } from "./object/strictObjectCheck.js";
import { isObject } from "./utils/index.js";

export const deepCompare = (
  one,
  two,
  strictCheck = false,
  entityOneName,
  entityTwoName
) => {
  try {
    if (strictCheck) {
      if (Array.isArray(one) && Array.isArray(two)) {
        return strictArrayCompare(
          one,
          two,
          entityOneName || "Array1",
          entityTwoName || "Array2"
        );
      } else if (
        isObject(one) &&
        isObject(two) &&
        !Array.isArray(one) &&
        !Array.isArray(two)
      ) {
        return strictObjectCompare(
          one,
          two,
          entityOneName || "Object1",
          entityTwoName || "Object2"
        );
      } else {
        return {
          status: false,
          result: {
            pathOne: `DataType1`,
            valueOne: one,
            pathTwo: `Datatype2`,
            valueTwo: two,
            reason: `Please provide same datatypes to compare`,
          },
        };
      }
    } else {
      if (Array.isArray(one) && Array.isArray(two)) {
        return arrayCompare(
          one,
          two,
          entityOneName || "Array1",
          entityTwoName || "Array2"
        );
      } else if (
        isObject(one) &&
        isObject(two) &&
        !Array.isArray(one) &&
        !Array.isArray(two)
      ) {
        return objectCompare(
          one,
          two,
          entityOneName || "Object1",
          entityTwoName || "Object2"
        );
      } else {
        return {
          status: false,
          result: {
            pathOne: `DataType1`,
            valueOne: one,
            pathTwo: `Datatype2`,
            valueTwo: two,
            reason: `Please provide same datatypes to compare`,
          },
        };
      }
    }
  } catch (e) {
    return e;
  }
};
