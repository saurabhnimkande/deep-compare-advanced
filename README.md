# Deep Compare Objects / Arrays.

Not a typical object compare package.<br />
Compare Objects, Arrays, Nested Objects/Arrays, Array of Objects.

## About

deep-compare-advanced is a object/array comparision module which
helps us to compare arrays, objects, array of objects, object
with arrays, and various combination of JS data structures
within the object/array datatype with zero dependencies.

## Features

- Compare Objects
- Compare Arrays
- Compare array of objects
- Compare deep nested arrays i.e 2D/3D arrays
- Compare nested object with arrays
- Get the exact path of the values that mismatch
- Get the exact values that mismatch

## Installation

First install [Node.js](http://nodejs.org/) Then:

Using npm:

```sh
$ npm install deep-compare-advanced
```

Using pnpm:

```sh
$ pnpm install deep-compare-advanced
```

## Importing

```js
// Using Node.js `require()`
const { deepCompare } = require("deep-compare-advanced");

// Using ES6 imports
import { deepCompare } from "deep-compare-advanced";
```

## Example

### `deepCompare(datatype1, datatype2, strictCheck(optional), datatypeName1(optional), datatypeName2(optional));`

#### Params

- datatype1 / datatype2 can be `object` or `array`.
- (Optional) strictCheck (`Boolean`) by default `false` is used for strict checking of arrays index elements. if `true` strict check of ordering of the array elements. if `false` the array values can be in any order.
- (Optional) datatypeName1 / datatypeName2 (`string`) these two fields represent the name of the object/array, which is displayed in the result object in case of error. by default values for objects are `Object1, Object2`, and for arrays are `Array1, Array2`.

#### Return

```js
  // In case of objects/arrays match
  {
     status: true,
     result: {},
  }

  // In case of object/arrays do not match
  {
      status: false,
      result: {
        pathOne: `Object1.data1`,
        valueOne: ["two", "one", "three", 10],
        pathTwo: `Object2.data1`,
        valueTwo: ["one", "two", "three"],
        reason: `Array length does not match.`,
      },
    }
```

- status (`Boolean`) contains the comparision result.
- result (`object`) contains all the details about the mismatch if status is false.
- pathOne / pathTwo (`string`) contains the exact path of the values that mismatch.
- valueOne / valueTwo (`string`) contains the values of the respective paths.
- reason (`string`) contains short summary of the error.

#### Example 1

```js
// Basic object / array compare.
console.log(deepCompare({ key: "value" }, { key: "value" }));
console.log(deepCompare(["value1", "value2"], ["value1", "value2"]));
// returns
// {
//     status: true,
//     result: {},
// }

console.log(deepCompare({ key: "value" }, { key: "value1" }));
// returns
// {
//   status: false,
//   result: {
//     pathOne: 'Object1.key',
//     valueOne: 'value',
//     pathTwo: 'Object2.key',
//     valueTwo: 'value1',
//     reason: 'Values mismatch path1 Object1.key value "value", path2 Object2.key value "value1".'
//   }
// }
```

#### Example 2

```js
// array containing same values but in different order strictCheck false by default.
console.log(
  deepCompare(["value1", "value2", "value3"], ["value2", "value3", "value1"])
);
// returns
// {
//     status: true,
//     result: {},
// }

// array containing same values but in different order but this time strictCheck is true.
console.log(
  deepCompare(
    ["value1", "value2", "value3"],
    ["value2", "value3", "value1"],
    true
  )
);
// returns
// {
//   status: false,
//   result: {
//     pathOne: 'Array1[0]',
//     valueOne: 'value1',
//     pathTwo: 'Array2[0]',
//     valueTwo: 'value2',
//     reason: 'Values mismatch path1 Array1[0] path2 Array2[0].'
//   }
// }
```

#### Example 3

```js
// Array of objects with value mismatch, shuffled order.
// passed optional params for custom array names.
// Note strictCheck is false.
console.log(
  deepCompare(
    [
      { obj1: "obj1" },
      { obj2: "obj2" },
      { obj3: { nestedObject: { data1: "data1", data2: "data2" } } },
    ],
    [
      { obj1: "obj1" },
      { obj3: { nestedObject: { data1: "data1", data2: "value" } } },
      { obj2: "obj2" },
    ],
    false,
    "MyArray1",
    "MyArray2"
  )
);
// returns
// {
//   status: false,
//   result: {
//     pathOne: 'MyArray1[2].obj3.nestedObject.data2',
//     valueOne: 'data2',
//     pathTwo: 'MyArray2[0].obj3.nestedObject.data2',
//     valueTwo: 'value',
//     reason: 'Values mismatch path1 MyArray1[2].obj3.nestedObject.data2 value "data2",
//      path2 MyArray2[0].obj3.nestedObject.data2 value "value".'
//   }
// }
```

#### Example 4

```js
// Object with random ordering and array with random ordering.
// Note strictCheck is true. strictCheck is only considered of arrays.
console.log(
  deepCompare(
    {
      check: {
        display: {
          bool: true,
          array: ["one", "two", { testObj: "value" }],
        },
      },
      foo: {
        test: "hello",
      },
    },
    {
      foo: {
        test: "hello",
      },
      check: {
        display: {
          array: ["one", { testObj: "value" }, "two"],
          bool: true,
        },
      },
    },
    true
  )
);

// returns
// {
//   status: false,
//   result: {
//     pathOne: 'Object1.check.display.array[1]',
//     valueOne: 'two',
//     pathTwo: 'Object2.check.display.array[1]',
//     valueTwo: { testObj: 'value' },
//     reason: 'Values mismatch path1 Object1.check.display.array[1] 
//       path2 Object2.check.display.array[1].'
//   }
// }
```

## License

MIT © [Saurabh Nimkande](https://saurabh-nimkande.mit-license.org/)
