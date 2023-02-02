import { isObject } from "../utils/index.js";
import { arrayCompare } from "../array/array.js";

export const objectCompare = (one, two, parentOne, parentTwo) => {
  if (!isObject(one) || !isObject(two)) {
    return {
      status: false,
      result: {
        pathOne: `${parentOne}`,
        valueOne: one,
        pathTwo: `${parentTwo}`,
        valueTwo: two,
        reason: `Object Expected.`,
      },
    };
  }
  let oneKeys = Object.keys(one);
  let twoKeys = Object.keys(two);
  if (oneKeys.length !== twoKeys.length) {
    return {
      status: false,
      result: {
        pathOne: `${parentOne}`,
        valueOne: one,
        pathTwo: `${parentTwo}`,
        valueTwo: two,
        reason: `Object length does not match.`,
      },
    };
  } else {
    for (let keys in one) {
      let value1 = one[keys];
      let value2 = two[keys];
      const checkObjects = isObject(value1) && isObject(value2);
      const checkArrays = Array.isArray(value1) && Array.isArray(value2);
      let mergeParent1 = `${parentOne}.${keys}`;
      let mergeParent2 = `${parentTwo}.${keys}`;
      let resultObject =
        checkObjects &&
        !checkArrays &&
        objectCompare(value1, value2, mergeParent1, mergeParent2);
      let resultArrays =
        checkArrays && arrayCompare(value1, value2, mergeParent1, mergeParent2);
      if (checkArrays && !resultArrays?.status) {
        return { status: false, result: { ...resultArrays?.result } };
      } else if (checkObjects && !checkArrays && !resultObject?.status) {
        return { status: false, result: { ...resultObject?.result } };
      } else if (!checkObjects && !checkArrays && value1 !== value2) {
        return {
          status: false,
          result: {
            pathOne: mergeParent1,
            valueOne: value1,
            pathTwo: mergeParent2,
            valueTwo: value2,
            reason: `Values mismatch path1 ${mergeParent1} value "${one[keys]}", path2 ${mergeParent2} value "${two[keys]}".`,
          },
        };
      }
    }
    return { status: true, result: {} };
  }
};
