# Common ID Validator

## Introduction

A light-weight low-dependency package to syntactically validate commonly used resource identifiers in databases and other systems.

## Installation

```sh
npm install common-id-validator
```

## Usage

### Example 1. Checking UUID

```js
const { isUUID } = require("common-id-validator");
isUUID("21b7a7a8-cec5-4b67-9a55-74f800326045"); // true
isUUID("Hello World"); // false

isUUID("82ac7f18-e860-11ee-a5c4-325096b39f47", 4); // false
isUUID("000003e8-e861-21ee-b700-325096b39f47", 2); // true
```

### Example 2. Checking ObjectId

```js
const { isObjectId } = require("common-id-validator");
const { ObjectId } = require("bson"); // ObjectId wrapper used in mongoDB adapter

isObjectId(new ObjectId()); // true
isObjectId("5f92cbf10cf217478ba93561"); // true
isObjectId("000003e8-e861-21ee-b700-325096b39f47"); // false
```

### Example 3. Checking TypeId (https://www.npmjs.com/package/typeid-js)

```js
const { isTypeId } = require("common-id-validator");

isTypeId("user_2x4y6z8a0b1c2d3e4f5g6h7j8k"); // true
isTypeId("user2x4y6z8a0b1c2d3e4f5g6h7j8k"); // false
```

## License

[MIT](https://github.com/kkhtun/common-id-validator/blob/main/LICENSE)
