const { isTypeId } = require("../src");
const { error } = require("../src/constants/error.constants");

describe("isTypeId()", () => {
    test("Should throw a custom error message if no input value is provided", () => {
        expect(() => isTypeId()).toThrow(error.NO_INPUT_VALUE);
        expect(() => isTypeId(undefined)).not.toThrow(error.NO_INPUT_VALUE);
    });
    test("Should correctly validate typeId", () => {
        const values = [
            "user_2x4y6z8a0b1c2d3e4f5g6h7j8k",
            "tester_7zzzzzzzzzzzzzzzzzzzzzzzzz",
        ];
        values.forEach((value) => {
            expect(isTypeId(value)).toBe(true);
        });
    });
    test("Should correctly invalidate typeId", () => {
        const values = [
            "user_2x4y6z8a0b1c2d3e4f5g6h7j8k4", // Extra char
            "Tuser2_2x4y6z8a0b1c2d3e4f5g6h7j8k", // Type prefix contains non-allowed chars
            "user2x4y6z8a0b1c2d3e4f5g6h7j8k", // Missing underscore
            "thisisaveryverylongtypeprefixwithmorethansixtythreecharactersexceedingtheprefix_2x4y6z8a0b1c2d3e4f5g6h7j8k",
            "user_8zzzzzzzzzzzzzzzzzzzzzzzzz", // UUID overflow case
            false,
            { x: 1 },
            245,
        ];
        values.forEach((value) => {
            expect(isTypeId(value)).toBe(false);
        });
    });
});
