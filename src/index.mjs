import { arrayCompare } from "./array/array.mjs";
import { strictArrayCompare } from "./array/strictArrayCheck.mjs";
import { objectCompare } from "./object/object.mjs";
import { strictObjectCompare } from "./object/strictObjectCheck.mjs";
import { isObject } from "./utils/index.mjs";

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
