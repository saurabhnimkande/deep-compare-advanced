import { isObject } from "../../utils/index.js";

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
    for (let i = 0; i < oneKeys.length; i++) {
      if (oneKeys[i] !== twoKeys[i]) {
        return {
          status: false,
          result: {
            pathOne: `${parentOne}.${oneKeys[i]}`,
            valueOne: one[oneKeys[i]],
            pathTwo: `${parentTwo}.${twoKeys[i]}`,
            valueTwo: two[twoKeys[i]],
            reason: `Key mismatch path1 ${parentOne}.${oneKeys[i]} path2 ${parentTwo}.${twoKeys[i]}`,
          },
        };
      }
    }

    for (let keys in one) {
      let value1 = one[keys];
      let value2 = two[keys];
      const isObjects = isObject(value1) && isObject(value2);
      let mergeParent1 = `${parentOne}.${keys}`;
      let mergeParent2 = `${parentTwo}.${keys}`;
      let compare =
        isObject && objectCompare(value1, value2, mergeParent1, mergeParent2);
      if (isObjects && !compare?.status) {
        return { status: false, result: { ...compare?.result } };
      } else if (!isObjects && value1 !== value2) {
        return {
          status: false,
          result: {
            pathOne: `${parentOne}.${keys}`,
            valueOne: value1,
            pathTwo: `${parentTwo}.${keys}`,
            valueTwo: value2,
            reason: `Values mismatch path1 ${parentOne}.${keys} value "${one[keys]}", path2 ${parentTwo}.${keys} value "${two[keys]}"`,
          },
        };
      }
    }
    return { status: true, result: {} };
  }
};
