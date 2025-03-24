const { isObject } = require("../utils/index.cjs");
const { strictObjectCompare } = require("../object/strictObjectCheck.cjs");

exports.strictArrayCompare = (one, two, parentOne, parentTwo) => {
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
    for (let i = 0; i < length; i++) {
      let oneData = one?.[i];
      let twoData = two?.[i];
      const checkObjects = isObject(oneData) && isObject(twoData);
      const checkArrays = Array.isArray(oneData) && Array.isArray(twoData);
      let mergeParent1 = `${parentOne}[${i}]`;
      let mergeParent2 = `${parentTwo}[${i}]`;
      let resultObject =
        checkObjects &&
        !checkArrays &&
        strictObjectCompare(oneData, twoData, mergeParent1, mergeParent2);
      let resultArray =
        checkArrays &&
        strictArrayCompare(oneData, twoData, mergeParent1, mergeParent2);

      if (checkArrays && !resultArray?.status) {
        return { status: false, result: { ...resultArray?.result } };
      } else if (checkObjects && !checkArrays && !resultObject?.status) {
        return { status: false, result: { ...resultObject?.result } };
      } else if (!checkObjects && !checkArrays && oneData !== twoData) {
        return {
          status: false,
          result: {
            pathOne: mergeParent1,
            valueOne: oneData,
            pathTwo: mergeParent2,
            valueTwo: twoData,
            reason: `Values mismatch path1 ${mergeParent1} path2 ${mergeParent2}.`,
          },
        };
      }
    }

    return { status: true, result: {} };
  }
};
