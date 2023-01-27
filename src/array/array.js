import { isArray, isObject } from "../../utils";
import { objectCompare } from "../object/object";

export const arrayCompare = (one, two, parentOne, parentTwo) => {
  if (!isArray(one) || !isArray(two)) {
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
      for (let j = 0; j < copyTwo?.length; j++) {
        let twoData = copyTwo?.[j];
        const checkObjects = isObject(oneData) && isObject(twoData);
        const checkArrays = isArray(oneData) && isArray(twoData);
        let mergeParent1 = `${parentOne}[${i}]`;
        let mergeParent2 = `${parentTwo}[${j}]`;
        let resultObject =
          checkObjects &&
          objectCompare(oneData, twoData, mergeParent1, mergeParent2);
        let resultArray =
          checkArrays &&
          arrayCompare(oneData, twoData, mergeParent1, mergeParent2);

        if (checkObjects && !resultObject?.status) {
          return { status: false, result: { ...resultObject?.result } };
        } else if (checkArrays && !resultArray?.status) {
          return { status: false, result: { ...resultArray?.result } };
        } else if (!checkObjects && !checkArrays && value1 !== value2) {
          return {
            status: false,
            result: {
              pathOne: mergeParent1,
              valueOne: value1,
              pathTwo: mergeParent2,
              valueTwo: value2,
              reason: `Values mismatch path1 ${parentOne}.${keys} value "${one[keys]}", path2 ${parentTwo}.${keys} value "${two[keys]}"`,
            },
          };
        }
      }
    }
  }
};
