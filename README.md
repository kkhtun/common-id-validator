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

### Example 4. Checking MAC addresses

```js
const { isMacAddress } = require("common-id-validator");

isMacAddress("BC-50-D5-2C-5D-AC"); // true
isMacAddress("60:C1:9A:AE:A8:71"); // true
isMacAddress("3542.D272.908E"); // true

isMacAddress("BC-50-D5-2C-5D-AC-2C"); // false
isMacAddress("60:C1:9A-AE:A8:71"); // false
```

### Example 5. Checking Snowflake ID (Twitter variant)

Snowflake ID should be either BigInt or String to be represented properly as unsigned 64-bit integers. Any other data type including Number will return false.

```js
const { isTwitterSnowflakeId } = require("common-id-validator");

isTwitterSnowflakeId(BigInt("1771647565570244608")); // true
isTwitterSnowflakeId("7178357033781956611"); // true

isTwitterSnowflakeId("717835703378A956611"); // false
isTwitterSnowflakeId(1771647565570244608); // false
```

## GitHub

https://github.com/kkhtun/common-id-validator

## License

[MIT](https://github.com/kkhtun/common-id-validator/blob/main/LICENSE)
