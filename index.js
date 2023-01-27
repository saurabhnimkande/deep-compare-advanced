import { objectCompare } from "./src/object/object.js";
import { isArray, isObject } from "./utils/index.js";

export const deepCompare = (one, two) => {
  if (isObject(one) && isObject(two)) {
    return objectCompare(one, two, "Object1", "Object2");
  } else if (isArray(one) && isArray(two)) {
    return "Comparing Arrays";
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