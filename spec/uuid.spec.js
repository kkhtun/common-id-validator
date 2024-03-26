const { isUUID } = require("../src");
const { error } = require("../src/constants/error.constants");

describe("isUUID()", () => {
    test("Should throw a custom error message if no input value is provided", () => {
        expect(() => isUUID()).toThrow(error.NO_INPUT_VALUE);
        expect(() => isUUID(undefined)).not.toThrow(error.NO_INPUT_VALUE);
    });

    test.concurrent.each([[0], [-1], ["v4"], ["a"], [false]])(
        "Should throw a custom error message if version is invalid (%p)",
        async (value) => {
            const input = "21b7a7a8-cec5-4b67-9a55-74f800326045";
            expect(() => isUUID(input, value)).toThrow(
                error.INVALID_UUID_VERSION
            );
        }
    );

    // Test for v4
    test.concurrent.each([
        ["21b7a7a8-cec5-4b67-9a55-74f800326045"],
        ["aef6a4fa-e2d1-4868-bd0e-0ac7e9404235"],
        ["9e60e826-ac15-411f-945a-712d05d0c88a"],
    ])("Should correctly validate UUID v4 (%p)", async (value) => {
        expect(isUUID(value)).toBe(true);
    });

    test.concurrent.each([
        ["123"],
        ["Hello World"],
        ["e2f07962-e85e-11ee-8639-325096b39f47"], // v1
        ["000003e8-e85e-21ee-9b00-325096b39f47"], // v2
        ["9073926b-929f-31c2-abc9-fad77ae3e8eb"], // v3
        ["9e60e826-ac15-411f-945a-712d05d0c88a is a uuid v4"],
        ["7b70f3b6-3e15-5099-bec1-50f28f0a7cf7"], // v5
    ])("Should correctly invalidate UUID v4 (%p)", async (value) => {
        expect(isUUID(value)).toBe(false);
    });

    // Test for v1
    test.concurrent.each([
        ["82ac7f18-e860-11ee-a5c4-325096b39f47"],
        ["8ab44ff6-e860-11ee-820b-325096b39f47"],
    ])("Should correctly validate UUID v1 (%p)", async (value) => {
        expect(isUUID(value, 1)).toBe(true);
    });

    test.concurrent.each([
        ["000003e8-e85e-21ee-9b00-325096b39f47"], // v2
        ["9073926b-929f-31c2-abc9-fad77ae3e8eb"], // v3
        ["9e60e826-ac15-411f-945a-712d05d0c88a"], // v4
    ])("Should correctly invalidate UUID v1 (%p)", async (value) => {
        expect(isUUID(value, 1)).toBe(false);
    });

    // Test for v2
    test.concurrent.each([
        ["000003e8-e861-21ee-b700-325096b39f47"],
        ["000003e8-e861-21ee-b700-325096b39f47"],
    ])("Should correctly validate UUID v2 (%p)", async (value) => {
        expect(isUUID(value, 2)).toBe(true);
    });

    test.concurrent.each([
        ["e2f07962-e85e-11ee-8639-325096b39f47"], // v1
        ["9073926b-929f-31c2-abc9-fad77ae3e8eb"], // v3
        ["9e60e826-ac15-411f-945a-712d05d0c88a"], // v4
    ])("Should correctly validate UUID v2 (%p)", async (value) => {
        expect(isUUID(value, 2)).toBe(false);
    });

    // Test for v3
    test.concurrent.each([
        ["9a74c83e-2c09-3513-a74b-91d679be82b8"],
        ["1e93767f-9f44-31f4-aa41-08c8da88a58c"],
    ])("Should correctly validate UUID v3 (%p)", async (value) => {
        expect(isUUID(value, 3)).toBe(true);
    });

    test.concurrent.each([
        ["e2f07962-e85e-11ee-8639-325096b39f47"], // v1
        ["000003e8-e85e-21ee-9b00-325096b39f47"], // v2
        ["9e60e826-ac15-411f-945a-712d05d0c88a"], // v4
    ])("Should correctly invalidate UUID v3 (%p)", async (value) => {
        expect(isUUID(value, 3)).toBe(false);
    });

    // Test for v5
    test.concurrent.each([
        ["39480660-9aef-5abd-928d-cbfcb47436f6"],
        ["8622609d-a148-5508-a1ec-76f416331015"],
    ])("Should correctly validate UUID v5 (%p)", async (value) => {
        expect(isUUID(value, 5)).toBe(true);
    });

    test.concurrent.each([
        ["e2f07962-e85e-11ee-8639-325096b39f47"], // v1
        ["000003e8-e85e-21ee-9b00-325096b39f47"], // v2
        ["9a74c83e-2c09-3513-a74b-91d679be82b8"], // v3
        ["9e60e826-ac15-411f-945a-712d05d0c88a"], // v4
    ])("Should correctly invalidate UUID v5 (%p)", async (value) => {
        expect(isUUID(value, 5)).toBe(false);
    });
});
