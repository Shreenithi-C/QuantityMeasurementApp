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

    const cards = document.querySelectorAll(".card");
    const actionBtns = document.querySelectorAll(".action-box button");

    // -------------------------
    // DEFAULT ACTIVE (UC-11)
    // -------------------------
    const defaultCard = cards[0];
    const defaultAction = actionBtns[1];

    setActive(typeContainer, defaultCard, ".card");
    setActive(actionContainer, defaultAction, "button");

    // -------------------------
    // UC-13: HIDE OPERATOR INIT
    // -------------------------
    toggleOperators(false);

    // -------------------------
    // LOAD UNITS (UC-03 + UC-10)
    // -------------------------
    try {
        const units = await getUnits(state.type);
        console.log("Units:", units);

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
        console.log("History:", history);

        if (typeof renderHistory === "function") {
            renderHistory(history);
        }

    } catch (err) {
        console.error("Error loading history:", err.message);
    }

    // -------------------------
    // TYPE CLICK (UC-15 FINAL)
    // -------------------------
    cards.forEach(card => {
        card.addEventListener("click", async () => {

            // 1. Update state
            state.type = card.innerText.trim();
            console.log("Type:", state.type);

            // 2. Highlight UI
            setActive(typeContainer, card, ".card");

            // 3. CLEAR INPUTS
            const inputs = document.querySelectorAll(".values input");
            inputs[0].value = "";
            inputs[1].value = "";

            // 4. CLEAR RESULT
            showResult("—", "");

            // 5. RESET STATE
            state.fromUnit = "";
            state.toUnit = "";

            // 6. RELOAD UNITS
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
    // ACTION CLICK (UC-16)
    // -------------------------
    actionBtns.forEach(btn => {
        btn.addEventListener("click", () => {

            state.action = btn.innerText.trim();

            setActive(actionContainer, btn, "button");

            // UC-13
            toggleOperators(state.action === "Arithmetic");

            // CLEAR RESULT WHEN SWITCHING MODE
            showResult("—", "");

            console.log("Action:", state.action);
        });
    });

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

                console.log("Operator:", state.operator);
            });
        });

        document.addEventListener("click", () => {
            optionsBox.style.display = "none";
        });
    }

});