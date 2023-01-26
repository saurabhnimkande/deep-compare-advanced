import { deepCompare } from "../index.js";

describe("Testing for Objects", () => {
  test("Checking for wrong DataTypes passed as args", () => {
    let value1 = "randomString";
    let value2 = { object: "Object" };
    let result = deepCompare(value1, value2);

    expect(result).toStrictEqual({
      status: false,
      result: {
        pathOne: `DataType1`,
        valueOne: value1,
        pathTwo: `Datatype2`,
        valueTwo: value2,
        reason: `Please provide same datatypes to compare`,
      },
    });
  });

  test("Checking for correct object passed as args", () => {
    let value1 = { object: "Object" };
    let value2 = { object: "Object" };
    let result = deepCompare(value1, value2);

    expect(result).toStrictEqual({
      status: true,
      result: {},
    });
  });

  test("Checking for empty object passed as args", () => {
    let value1 = {};
    let value2 = {};
    let result = deepCompare(value1, value2);

    expect(result).toStrictEqual({
      status: true,
      result: {},
    });
  });

  test("Checking object mismatch #1", () => {
    let value1 = "randomString";
    let value2 = { object: "Object" };
    let result = deepCompare(value1, value2);

    expect(result).toStrictEqual({
      status: false,
      result: {
        pathOne: `DataType1`,
        valueOne: value1,
        pathTwo: `Datatype2`,
        valueTwo: value2,
        reason: `Please provide same datatypes to compare`,
      },
    });
  });
});
