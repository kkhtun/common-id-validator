const { ObjectId } = require("bson");

const { isObjectId } = require("../src");
const { error } = require("../src/constants/error.constants");

describe("isObjectId()", () => {
    test("Should throw a custom error message if no input value is provided", () => {
        expect(() => isObjectId()).toThrow(error.NO_INPUT_VALUE);
        expect(() => isObjectId(undefined)).not.toThrow(error.NO_INPUT_VALUE);
    });

    test.concurrent.each([
        ["5f92cbf10cf217478ba93561"],
        ["65fee9d63210f7e6e75b3e60"],
        ["65fee9df23b3656b03d49a4c"],
        [new ObjectId()],
    ])("Should correctly validate objectId (%p)", async (value) => {
        expect(isObjectId(value)).toBe(true);
    });

    test.concurrent.each([
        ["5f92cbf10cf217478ba9356"], // 1 char less
        ["5f92cbf10cf217478ba935615"], // 1 char more
        ["5fg2cbf10gf217478ba9t561"], // Contain non-hexa characters
        [false],
        [123],
        [{ x: 1 }],
    ])("Should correctly invalidate objectId (%p)", async (value) => {
        expect(isObjectId(value)).toBe(false);
    });
});
