import { arrayCompare } from "./src/array/array.js";
import { objectCompare } from "./src/object/object.js";
import { isObject } from "./utils/index.js";

export const deepCompare = (one, two) => {
  if (Array.isArray(one) && Array.isArray(two)) {
    return arrayCompare(one, two, "Array1", "Array2");
  } else if (isObject(one) && isObject(two)) {
    return objectCompare(one, two, "Object1", "Object2");
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
};