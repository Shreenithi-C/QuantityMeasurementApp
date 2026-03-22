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