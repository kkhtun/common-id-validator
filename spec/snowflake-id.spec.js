const { isTwitterSnowflakeId } = require("../src");
const { error } = require("../src/constants/error.constants");

describe("isTwitterSnowflakeId()", () => {
    test("Should throw a custom error message if no input value is provided", () => {
        expect(() => isTwitterSnowflakeId()).toThrow(error.NO_INPUT_VALUE);
        expect(() => isTwitterSnowflakeId(undefined)).not.toThrow(
            error.NO_INPUT_VALUE
        );
    });

    test.concurrent.each([
        ["7178357033781956611"],
        ["7178357033861648388"],
        [BigInt("1771647565570244608")],
        [BigInt("1541815603606036480")],
    ])("Should correctly validate snowflakeId (%p)", async (value) => {
        expect(isTwitterSnowflakeId(value)).toBe(true);
    });

    test.concurrent.each([
        ["717835703378A956611"],
        ["9223372036854775808"], // 9223372036854775807 is largest sint64
        [BigInt("18446744073709551616")],
        [1771647565570244608],
    ])("Should correctly invalidate snowflakeId (%p)", async (value) => {
        expect(isTwitterSnowflakeId(value)).toBe(false);
    });
});
