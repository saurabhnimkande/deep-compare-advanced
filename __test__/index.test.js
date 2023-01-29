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

  test("Checking object mismatch", () => {
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

  test("Checking object 1 level nested", () => {
    let value1 = {
      object1: { test1: "test1" },
      object2: { test2: "test2" },
      string: "hello",
      bool: true,
      num: 1,
    };
    let value2 = {
      object1: { test1: "test1" },
      object2: { test2: "test2" },
      string: "hello",
      bool: true,
      num: 1,
    };
    let result = deepCompare(value1, value2);

    expect(result).toStrictEqual({
      status: true,
      result: {},
    });
  });

  test("Checking object 1 level nested diff", () => {
    let value1 = {
      object1: { test1: "test2" },
      object2: { test2: "test2" },
      string: "hello",
      bool: true,
      num: 1,
    };
    let value2 = {
      object1: { test1: "test1" },
      object2: { test2: "test2" },
      string: "hello",
      bool: true,
      num: 1,
    };
    let result = deepCompare(value1, value2);

    expect(result).toStrictEqual({
      status: false,
      result: {
        pathOne: `Object1.object1.test1`,
        valueOne: "test2",
        pathTwo: `Object2.object1.test1`,
        valueTwo: "test1",
        reason: `Values mismatch path1 Object1.object1.test1 value "test2", path2 Object2.object1.test1 value "test1"`,
      },
    });
  });

  test("Checking object 1 level outer diff", () => {
    let value1 = {
      object1: { test1: "test1" },
      object2: { test2: "test2" },
      string: "hello",
      bool: true,
      num: 4,
    };
    let value2 = {
      object1: { test1: "test1" },
      object2: { test2: "test2" },
      string: "hello",
      bool: true,
      num: 1,
    };
    let result = deepCompare(value1, value2);

    expect(result).toStrictEqual({
      status: false,
      result: {
        pathOne: `Object1.num`,
        valueOne: 4,
        pathTwo: `Object2.num`,
        valueTwo: 1,
        reason: `Values mismatch path1 Object1.num value "4", path2 Object2.num value "1"`,
      },
    });
  });

  test("Checking object 5 level", () => {
    let value1 = {
      object1: { test1: "test1" },
      object2: { test2: { get: { one: 1 }, get1: { two: 2 } } },
      string: "hello",
      bool: true,
      num: 1,
    };
    let value2 = {
      object1: { test1: "test1" },
      object2: { test2: { get: { one: 1 }, get1: { two: 2 } } },
      string: "hello",
      bool: true,
      num: 1,
    };
    let result = deepCompare(value1, value2);

    expect(result).toStrictEqual({
      status: true,
      result: {},
    });
  });

  test("Checking object 5 level object order change", () => {
    let value1 = {
      object2: { test2: { get1: { two: 2 }, get: { one: 1 } } },
      bool: true,
      string: "hello",
      object1: { test1: "test1" },
      num: 1,
    };
    let value2 = {
      object1: { test1: "test1" },
      object2: { test2: { get: { one: 1 }, get1: { two: 2 } } },
      string: "hello",
      bool: true,
      num: 1,
    };
    let result = deepCompare(value1, value2);

    expect(result).toStrictEqual({
      status: true,
      result: {},
    });
  });


  test("Checking object 5 level object order change with additional key", () => {
    let value1 = {
      object2: { test2: { get1: { two: 2 }, get: { three: 3, one: 1 } } },
      bool: true,
      string: "hello",
      object1: { test1: "test1" },
      num: 1,
    };
    let value2 = {
      object1: { test1: "test1" },
      object2: { test2: { get: { one: 1 }, get1: { two: 2 } } },
      string: "hello",
      bool: true,
      num: 1,
    };
    let result = deepCompare(value1, value2);

    expect(result).toStrictEqual({
      status: false,
      result: {
        pathOne: `Object1.object2.test2.get`,
        valueOne: {
          one:1,
          three:3
        },
        pathTwo: `Object2.object2.test2.get`,
        valueTwo: {
          one:1
        },
        reason: `Object length does not match.`,
      },
    });
  });
});
