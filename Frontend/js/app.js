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
        if (typeof renderHistory === "function") {
            renderHistory(history);
        }
    } catch (err) {
        console.error("Error loading history:", err.message);
    }

    // -------------------------
    // UC-15: TYPE CLICK
    // -------------------------
    cards.forEach(card => {
        card.addEventListener("click", async () => {

            // 1. Update state
            state.type = card.innerText.trim();
            console.log("Type:", state.type);

            // 2. Highlight UI
            setActive(typeContainer, card, ".card");

            // 3. Clear inputs
            fromInput.value = "";
            toInput.value = "";

            // 4. Clear result
            showResult("—", "");

            // 5. Reset units in state
            state.fromUnit = "";
            state.toUnit = "";

            // 6. Reload units
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

            // 1. Update state
            state.action = btn.innerText.trim();
            console.log("Action:", state.action);

            // 2. Highlight UI
            setActive(actionContainer, btn, "button");

            // 3. Toggle operator row
            toggleOperators(state.action === "Arithmetic");

            // 4. Clear result
            showResult("—", "");
        });
    });

    // -------------------------
    // OPERATOR DROPDOWN
    // -------------------------
    const selectedBtn = document.querySelector("#selected-operator");
    const optionsBox = document.querySelector("#operator-options");
    const options = document.querySelectorAll(".operator-option");

    if (selectedBtn && optionsBox) {

        // Open/close dropdown
        selectedBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            optionsBox.style.display =
                optionsBox.style.display === "block" ? "none" : "block";
        });

        // Select operator
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

        // Close on outside click
        document.addEventListener("click", () => {
            optionsBox.style.display = "none";
        });
    }

});