function applyConversion(value, convObj) {

    if (!Number.isFinite(value)) {
        throw new Error("Invalid number");
    }

    // SAME UNIT case
    if (!convObj) {
        return value;
    }

    // FACTOR
    if (convObj.factor != null) {
        return parseFloat((value * convObj.factor).toFixed(6));
    }

    // FORMULA
    if (convObj.formula) {
        const expr = convObj.formula.replace("x", value);

        try {
            return parseFloat(eval(expr).toFixed(6));
        } catch {
            throw new Error("Bad formula");
        }
    }

    throw new Error("Invalid conversion object");
}

function compareValues(v1, u1, v2, u2, base1, base2) {

    // invalid check
    if (!Number.isFinite(v1) || !Number.isFinite(v2)) {
        return "Invalid values — cannot compare";
    }

    // GREATER
    if (base1 > base2) {
        return `${v1} ${u1} is GREATER than ${v2} ${u2}`;
    }

    // LESS
    if (base1 < base2) {
        return `${v1} ${u1} is LESS than ${v2} ${u2}`;
    }

    // EQUAL
    return `${v1} ${u1} is EQUAL to ${v2} ${u2}`;
}

function performArithmetic(v1, v2normalised, op) {

    if (!Number.isFinite(v1) || !Number.isFinite(v2normalised)) {
        throw new Error("Invalid number");
    }

    switch(op) {

        case "+":
            return parseFloat((v1 + v2normalised).toFixed(6));

        case "-":
            return parseFloat((v1 - v2normalised).toFixed(6));

        case "*":
            return parseFloat((v1 * v2normalised).toFixed(6));

        case "/":
            if (v2normalised === 0) {
                throw new Error("Divide by zero");
            }
            return parseFloat((v1 / v2normalised).toFixed(6));

        default:
            throw new Error("Unknown operator");
    }
}