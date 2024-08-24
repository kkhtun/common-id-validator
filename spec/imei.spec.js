const { isIMEI } = require("../src");
const { error } = require("../src/constants/error.constants");

describe("isIMEI()", () => {
    test("Should throw a custom error message if no input value is provided", () => {
        expect(() => isIMEI()).toThrow(error.NO_INPUT_VALUE);
        expect(() => isIMEI(undefined)).not.toThrow(error.NO_INPUT_VALUE);
    });

    test.concurrent.each([
        ["356303483752836"],
        ["35-630348-375283-6"],
        ["356303488241058"],
        ["35-630348-824105-8"],
    ])("Should correctly validate IMEI (%p)", async (value) => {
        expect(isIMEI(value)).toBe(true);
    });

    test.concurrent.each([
        [""],
        [1234],
        [{ x: "356303488241051" }],
        ["35630-348-375283-6"],
        ["35-630-348-375283-6"],
        ["35-630348-375283-7"],
        ["356303488241051"],
    ])("Should correctly invalidate IMEI (%p)", async (value) => {
        expect(isIMEI(value)).toBe(false);
    });
});
