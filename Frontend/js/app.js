document.addEventListener("DOMContentLoaded", async () => {

    // -------------------------
    // STATE (UC-02)
    // -------------------------
    const state = {
        type: "Length",
        action: "Conversion",
        fromVal: null,
        fromUnit: "",
        toVal: null,
        toUnit: "",
        operator: "+"
    };

    console.log("App Loaded");

    // -------------------------
    // SELECTORS
    // -------------------------
    const typeContainer = document.querySelector(".type-box");
    const actionContainer = document.querySelector(".action-box");

    const fromSelect = document.querySelector("#from-unit");
    const toSelect = document.querySelector("#to-unit");

    const inputs = document.querySelectorAll(".values input");
    const fromInput = inputs[0];
    const toInput = inputs[1];

    const cards = document.querySelectorAll(".card");
    const actionBtns = document.querySelectorAll(".action-box button");

    // -------------------------
    // DEFAULT ACTIVE (UC-11)
    // -------------------------
    setActive(typeContainer, cards[0], ".card");
    setActive(actionContainer, actionBtns[1], "button");

    // -------------------------
    // UC-13: HIDE OPERATOR INIT
    // -------------------------
    toggleOperators(false);

    // -------------------------
    // LOAD UNITS (UC-03 + UC-10)
    // -------------------------
    try {
        const units = await getUnits(state.type);
        populateDropdown(fromSelect, units);
        populateDropdown(toSelect, units);
    } catch (err) {
        console.error("Error loading units:", err.message);
    }

    // -------------------------
    // LOAD HISTORY (UC-06)
    // -------------------------
    try {
        const history = await getHistory();
        renderHistory(history);
    } catch (err) {
        console.error("Error loading history:", err.message);
    }

    // -------------------------
    // UC-15: TYPE CLICK
    // -------------------------
    cards.forEach(card => {
        card.addEventListener("click", async () => {

            state.type = card.innerText.trim();
            setActive(typeContainer, card, ".card");

            // Clear inputs + result
            fromInput.value = "";
            toInput.value = "";
            showResult("—", "");

            state.fromUnit = "";
            state.toUnit = "";

            try {
                const units = await getUnits(state.type);
                populateDropdown(fromSelect, units);
                populateDropdown(toSelect, units);
            } catch (err) {
                console.error("Error reloading units:", err.message);
            }
        });
    });

    // -------------------------
    // UC-16: ACTION CLICK
    // -------------------------
    actionBtns.forEach(btn => {
        btn.addEventListener("click", () => {

            state.action = btn.innerText.trim();
            setActive(actionContainer, btn, "button");

            toggleOperators(state.action === "Arithmetic");

            showResult("—", "");
        });
    });

    // -------------------------
    // UC-17: EVENT TRIGGERS
    // -------------------------
    fromInput.addEventListener("input", calculate);
    toInput.addEventListener("input", calculate);
    fromSelect.addEventListener("change", calculate);
    toSelect.addEventListener("change", calculate);

    // -------------------------
    // OPERATOR DROPDOWN
    // -------------------------
    const selectedBtn = document.querySelector("#selected-operator");
    const optionsBox = document.querySelector("#operator-options");
    const options = document.querySelectorAll(".operator-option");

    if (selectedBtn && optionsBox) {

        selectedBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            optionsBox.style.display =
                optionsBox.style.display === "block" ? "none" : "block";
        });

        options.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();

                const op = btn.textContent.trim();
                selectedBtn.textContent = op;
                state.operator = op;

                optionsBox.style.display = "none";
            });
        });

        document.addEventListener("click", () => {
            optionsBox.style.display = "none";
        });
    }

    // -------------------------
    // UC-17: CALCULATION LOGIC
    // -------------------------
    async function calculate() {

        try {
            state.fromVal = parseFloat(fromInput.value);
            state.toVal = parseFloat(toInput.value);

            state.fromUnit = fromSelect.value;
            state.toUnit = toSelect.value;

            // ✅ FIXED VALIDATION
            if (isNaN(state.fromVal) || !state.fromUnit || !state.toUnit) {
                return;
            }

            let result;
            let expression = "";

            // -------------------------
            // CONVERSION
            // -------------------------
            if (state.action === "Conversion") {

                const conv = await getConversion(state.fromUnit, state.toUnit);
                result = applyConversion(state.fromVal, conv);

                showResult(result, state.toUnit);

                expression = `${state.fromVal} ${state.fromUnit} → ${state.toUnit}`;
            }

            // -------------------------
            // COMPARISON
            // -------------------------
            else if (state.action === "Comparison") {

                if (isNaN(state.toVal)) return;

                if (state.fromVal > state.toVal) {
                    result = `${state.fromVal} is GREATER than ${state.toVal}`;
                } else if (state.fromVal < state.toVal) {
                    result = `${state.fromVal} is LESS than ${state.toVal}`;
                } else {
                    result = `Both are EQUAL`;
                }

                showResult(result, "");

                expression = `${state.fromVal} vs ${state.toVal}`;
            }

            // -------------------------
            // ARITHMETIC
            // -------------------------
            else {

                if (isNaN(state.toVal)) return;

                let res;

                switch (state.operator) {
                    case "+":
                        res = state.fromVal + state.toVal;
                        break;
                    case "-":
                        res = state.fromVal - state.toVal;
                        break;
                    case "×":
                        res = state.fromVal * state.toVal;
                        break;
                    case "÷":
                        if (state.toVal === 0) throw new Error("Divide by zero");
                        res = state.fromVal / state.toVal;
                        break;
                    default:
                        throw new Error("Invalid operator");
                }

                result = parseFloat(res.toFixed(6));

                showResult(result, state.fromUnit);

                expression = `${state.fromVal} ${state.operator} ${state.toVal}`;
            }

            // -------------------------
            // SAVE HISTORY (UC-05)
            // -------------------------
            const record = {
                type: state.type,
                action: state.action,
                expression,
                result,
                timestamp: new Date().toISOString()
            };

            await saveHistory(record);

            // -------------------------
            // REFRESH HISTORY (UC-14)
            // -------------------------
            const history = await getHistory();
            renderHistory(history);

        } catch (e) {
            showResult("Error: " + e.message, "");
        }
    }
});