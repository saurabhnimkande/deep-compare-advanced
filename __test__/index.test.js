import { deepCompare } from "../index.js";

describe("Test cases for Objects", () => {
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
        reason: `Values mismatch path1 Object1.object1.test1 value "test2", path2 Object2.object1.test1 value "test1".`,
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
        reason: `Values mismatch path1 Object1.num value "4", path2 Object2.num value "1".`,
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
          one: 1,
          three: 3,
        },
        pathTwo: `Object2.object2.test2.get`,
        valueTwo: {
          one: 1,
        },
        reason: `Object length does not match.`,
      },
    });
  });
});

describe("Test cases for Arrays", () => {
  test("Checking for wrong DataTypes passed as args", () => {
    let value1 = "randomString";
    let value2 = ["hello"];
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

  test("Checking for correct array passed as args", () => {
    let value1 = ["hello"];
    let value2 = ["hello"];
    let result = deepCompare(value1, value2);

    expect(result).toStrictEqual({
      status: true,
      result: {},
    });
  });

  test("Checking for empty array passed as args", () => {
    let value1 = [];
    let value2 = [];
    let result = deepCompare(value1, value2);

    expect(result).toStrictEqual({
      status: true,
      result: {},
    });
  });

  test("Checking array mismatch", () => {
    let value1 = [];
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

  test("Checking array 1 level nested", () => {
    let value1 = ["one", "two", "three", ["one", "two", "three"]];
    let value2 = ["one", "two", "three", ["one", "two", "three"]];
    let result = deepCompare(value1, value2);

    expect(result).toStrictEqual({
      status: true,
      result: {},
    });
  });

  test("Checking array 1 level nested random order", () => {
    let value1 = ["one", ["one", "two", "three"], "two", "three"];
    let value2 = ["three", "two", ["one", "three", "two"], "one"];
    let result = deepCompare(value1, value2);

    expect(result).toStrictEqual({
      status: true,
      result: {},
    });
  });

  test("Checking array 1 level nested random order diff", () => {
    let value1 = ["one", ["one", "two", "three"], "two", "three"];
    let value2 = ["three", "two", ["one", "two", "four"], "one"];
    let result = deepCompare(value1, value2);

    expect(result).toStrictEqual({
      status: false,
      result: {
        pathOne: `Array1[1]`,
        valueOne: ["one", "two", "three"],
        pathTwo: `Array2[2]`,
        valueTwo: ["one", "two", "four"],
        reason: `Values mismatch path1 Array1[1] path2 Array2[2].`,
      },
    });
  });

  test("Checking 3d array", () => {
    let value1 = [
      [
        ["one", "two", "three"],
        ["four", "five", "six"],
      ],
      [
        ["seven", "eight"],
        ["nine", "ten"],
      ],
      [["eleven"], ["twelve"]],
    ];
    let value2 = [
      [
        ["one", "two", "three"],
        ["four", "five", "six"],
      ],
      [
        ["seven", "eight"],
        ["nine", "ten"],
      ],
      [["eleven"], ["twelve"]],
    ];
    let result = deepCompare(value1, value2);

    expect(result).toStrictEqual({
      status: true,
      result: {},
    });
  });

  test("Checking 3d array random order", () => {
    let value1 = [
      [
        ["seven", "eight"],
        ["nine", "ten"],
      ],
      [
        ["five", "four", "six"],
        ["three", "one", "two"],
      ],
      [["twelve"], ["eleven"]],
    ];
    let value2 = [
      [["eleven"], ["twelve"]],
      [
        ["two", "one", "three"],
        ["four", "five", "six"],
      ],
      [
        ["nine", "ten"],
        ["seven", "eight"],
      ],
    ];
    let result = deepCompare(value1, value2);

    expect(result).toStrictEqual({
      status: true,
      result: {},
    });
  });

  test("Checking 3d array random additional value", () => {
    let value1 = [
      [
        ["seven", "eight"],
        ["nine", "ten"],
      ],
      [
        ["five", "four", "six"],
        ["three", "one", "two"],
      ],
      [["twelve"], ["eleven"]],
    ];
    let value2 = [
      [["eleven"], ["twelve"]],
      [
        ["two", "one", "three"],
        ["four","randomValue", "five", "six"],
      ],
      [
        ["nine", "ten"],
        ["seven", "eight"],
      ],
    ];
    let result = deepCompare(value1, value2);

    expect(result).toStrictEqual({
      status: false,
      result: {
        pathOne: `Array1[1][0]`,
        valueOne: ["five", "four", "six"],
        pathTwo: `Array2[1][1]`,
        valueTwo: ["four","randomValue", "five", "six"],
        reason: `Array length does not match.`,
      },
    });
  });
});
