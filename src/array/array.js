import { isObject, removeElementFromIndex } from "../../utils/index.js";
import { objectCompare } from "../object/object.js";

export const arrayCompare = (one, two, parentOne, parentTwo) => {
  if (!Array.isArray(one) || !Array.isArray(two)) {
    return {
      status: false,
      result: {
        pathOne: `${parentOne}`,
        valueOne: one,
        pathTwo: `${parentTwo}`,
        valueTwo: two,
        reason: `Array Expected.`,
      },
    };
  }
  if (one?.length !== two?.length) {
    return {
      status: false,
      result: {
        pathOne: `${parentOne}`,
        valueOne: one,
        pathTwo: `${parentTwo}`,
        valueTwo: two,
        reason: `Array length does not match.`,
      },
    };
  } else {
    let length = one?.length;
    let copyTwo = [...two];
    for (let i = 0; i < length; i++) {
      let oneData = one?.[i];
      let count = 0;
      let errorData = {};
      for (let j = 0; j < copyTwo?.length; j++) {
        let twoData = copyTwo?.[j];

        const checkObjects = isObject(oneData) && isObject(twoData);
        const checkArrays = Array.isArray(oneData) && Array.isArray(twoData);
        let mergeParent1 = `${parentOne}[${i}]`;
        let mergeParent2 = `${parentTwo}[${j}]`;
        let resultObject =
          checkObjects &&
          !checkArrays &&
          objectCompare(oneData, twoData, mergeParent1, mergeParent2);
        let resultArray =
          checkArrays &&
          arrayCompare(oneData, twoData, mergeParent1, mergeParent2);

        if (checkArrays && !resultArray?.status) {
          errorData = { status: false, result: { ...resultArray?.result } };
        } else if (checkObjects && !checkArrays && !resultObject?.status) {
          errorData = { status: false, result: { ...resultObject?.result } };
        } else if (!checkObjects && !checkArrays && oneData !== twoData) {
          count++;
        } else {
          errorData = {};
          copyTwo = removeElementFromIndex(copyTwo, j);
          break;
        }
      }
      if (count === two?.length) {
        return {
          status: false,
          result: {
            pathOne: parentOne,
            valueOne: one,
            pathTwo: parentTwo,
            valueTwo: two,
            reason: `Values mismatch path1 ${parentOne} path2 ${parentTwo}"`,
          },
        };
      }
      if (Object?.keys(errorData).length > 0) {
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
          reason: `Values mismatch path1 ${parentOne} path2 ${parentTwo}"`,
        },
      };
    } else {
      return { status: true, result: {} };
    }
  }
};
