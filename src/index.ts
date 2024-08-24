import { error } from "./constants/error.constants";

const uuidVerRegexMap: { [key: string]: string } = {
    1: "^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$",
    2: "^[0-9A-F]{8}-[0-9A-F]{4}-[2][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$",
    3: "^[0-9A-F]{8}-[0-9A-F]{4}-[3][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$",
    4: "^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$",
    5: "^[0-9A-F]{8}-[0-9A-F]{4}-[5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$",
};

export function isUUID(input: string, version: number = 4): boolean {
    if (arguments.length === 0) throw new Error(error.NO_INPUT_VALUE);
    if (![1, 2, 3, 4, 5].includes(version))
        throw new Error(error.INVALID_UUID_VERSION);
    return new RegExp(uuidVerRegexMap[version], "i").test(input);
}

export function isObjectId(input: string | object): boolean {
    if (arguments.length === 0) throw new Error(error.NO_INPUT_VALUE);

    const objectIdRegex: string = "^[0-9A-F]{24}$";

    if (typeof input === "string") {
        return new RegExp(objectIdRegex, "i").test(input);
    } else if (typeof input === "object") {
        // Try to invoke toString method (since most implementations wrap objectId inside object wrappers)
        return new RegExp(objectIdRegex, "i").test(input.toString());
    } else {
        return false;
    }
}

export function isTypeId(input: string): boolean {
    if (arguments.length === 0) throw new Error(error.NO_INPUT_VALUE);
    if (typeof input !== "string") return false;

    const typeIdRegex: string =
        "^[a-z]{0,63}_[0-7]{1}[0-9abcdefghjkmnpqrstvwxyz]{25}$";
    // TODO: Can do further validation by making sure the suffix decodes to UUID v7
    return new RegExp(typeIdRegex, "i").test(input);
}

export function isMacAddress(input: string): boolean {
    if (arguments.length === 0) throw new Error(error.NO_INPUT_VALUE);
    if (typeof input !== "string") return false;

    const macAddressRegex: string =
        "^(([0-9A-F]{2}[:-]){5}([0-9A-F]{2})|([0-9A-F]{4}.[0-9A-F]{4}.[0-9A-F]{4})|[0-9A-F]{12})$";
    return (
        new RegExp(macAddressRegex, "i").test(input) &&
        !(input.indexOf("-") !== -1 && input.indexOf(":") !== -1) // Should not contain both - and : as separators
    );
}

// TODO: Should implementa global func to consolidate other snowflake variants (e.g Discord)
export function isTwitterSnowflakeId(input: string | bigint): boolean {
    if (arguments.length === 0) throw new Error(error.NO_INPUT_VALUE);
    if (!["string", "bigint"].includes(typeof input)) return false;

    let bigIntId: bigint;
    if (typeof input === "string") {
        // Should contain digits only
        if (!new RegExp("^[0-9]+$", "i").test(input)) return false;
        bigIntId = BigInt(input);
    } else {
        bigIntId = input;
    }

    // SnowflakeId should fit inside SINT64_MAX
    const SINT64_MAX = BigInt("0x7FFFFFFFFFFFFFFF"); // Largest signed (highest bit always 0) 64-bit integer
    if (bigIntId > SINT64_MAX) return false;
    return true;
}

// Luhn's algorithm helper
function produceLuhnCheckDigit(input: string): number {
    const digitArray = input.split("").map((n) => parseInt(n));
    for (let i = digitArray.length - 1; i >= 0; i = i - 2) {
        digitArray[i] = digitArray[i] * 2;
        if (digitArray[i] >= 10) {
            digitArray[i] =
                Math.floor(digitArray[i] / 10) + (digitArray[i] % 10);
        }
    }
    const sum = digitArray.reduce((a, b) => a + b, 0);
    return 10 - (sum % 10);
}

// Currently checks format and check digit
// Software version IMEIs are rejected currently
// TODO: Consider validating IMEI components for better accuracy e.g. TAC
export function isIMEI(input: string | number): boolean {
    if (arguments.length === 0) throw new Error(error.NO_INPUT_VALUE);

    if (typeof input === "number" || typeof input === "string") {
        input = input.toString();
        if (input.includes("-")) {
            // Expected format XX-XXXXXX-XXXXXX-X
            if (input.length !== 18) return false;

            // Hyphens "-" need to be at these exact positions
            if (
                input.charAt(2) !== "-" ||
                input.charAt(9) !== "-" ||
                input.charAt(16) !== "-"
            )
                return false;

            input = input.replace(new RegExp("-", "g"), "");
        }

        if (input.length !== 15) return false;

        // Must be all digits
        if (!new RegExp("^[0-9]+$", "i").test(input)) return false;

        // Check digit
        const template = input.substring(0, input.length - 1);
        const correctCheckDigit = produceLuhnCheckDigit(template);

        return correctCheckDigit.toString() === input.charAt(input.length - 1);
    }
    return false;
}
