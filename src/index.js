const { error } = require("./constants/error.constants");

const uuidVerRegexMap = {
    1: "^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$",
    2: "^[0-9A-F]{8}-[0-9A-F]{4}-[2][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$",
    3: "^[0-9A-F]{8}-[0-9A-F]{4}-[3][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$",
    4: "^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$",
    5: "^[0-9A-F]{8}-[0-9A-F]{4}-[5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$",
};

exports.isUUID = function (input, version = 4) {
    if (![1, 2, 3, 4, 5].includes(version))
        throw new Error(error.INVALID_UUID_VERSION);
    return new RegExp(uuidVerRegexMap[version], "i").test(input);
};
