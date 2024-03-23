const { error } = require("./constants/error.constants");

const uuidVerRegexMap = {
    1: "^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$",
    2: "^[0-9A-F]{8}-[0-9A-F]{4}-[2][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$",
    3: "^[0-9A-F]{8}-[0-9A-F]{4}-[3][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$",
    4: "^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$",
    5: "^[0-9A-F]{8}-[0-9A-F]{4}-[5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$",
};

exports.isUUID = function (input, version = 4) {
    if (arguments.length === 0) throw new Error(error.NO_INPUT_VALUE);
    if (![1, 2, 3, 4, 5].includes(version))
        throw new Error(error.INVALID_UUID_VERSION);
    return new RegExp(uuidVerRegexMap[version], "i").test(input);
};

exports.isObjectId = function (input) {
    if (arguments.length === 0) throw new Error(error.NO_INPUT_VALUE);

    const objectIdRegex = "^[0-9A-F]{24}$";

    if (typeof input === "string") {
        return new RegExp(objectIdRegex, "i").test(input);
    } else if (typeof input === "object") {
        // Try to invoke toString method (since most implementations wrap objectId inside object wrappers)
        return new RegExp(objectIdRegex, "i").test(input.toString());
    } else {
        return false;
    }
};
