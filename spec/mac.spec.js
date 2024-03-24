const { isMacAddress } = require("../src");
const { error } = require("../src/constants/error.constants");

describe("isMacAddress()", () => {
    test("Should throw a custom error message if no input value is provided", () => {
        expect(() => isMacAddress()).toThrow(error.NO_INPUT_VALUE);
        expect(() => isMacAddress(undefined)).not.toThrow(error.NO_INPUT_VALUE);
    });
    test("Should correctly validate MAC address", () => {
        const values = [
            "BC-50-D5-2C-5D-AC",
            "60:C1:9A:AE:A8:71",
            "3542.D272.908E",
            "2AC411494698",
        ];
        values.forEach((value) => {
            expect(isMacAddress(value)).toBe(true);
        });
    });
    test("Should correctly invalidate MAC address", () => {
        const values = [
            "BC-50-D5-2C-5D-AG",
            "BC-50-D5-2C-5D-AC-2C",
            "60:C1:5T:AE:A8:71",
            "60:C1:9A:AE:A8:71:2F",
            "3542.H272.908E",
            "3542.H272.908E.",
            "2AG411494698",
            "2AC4114946984",
            "60:C1:9A-AE:A8:71",
            false,
            123,
            { x: 1 },
        ];
        values.forEach((value) => {
            expect(isMacAddress(value)).toBe(false);
        });
    });
});
