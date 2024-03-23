# Common ID Validator

## Introduction

A package to validate commonly used resource identifiers in databases

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

## License

[MIT](https://github.com/kkhtun/common-id-validator/blob/main/LICENSE)
