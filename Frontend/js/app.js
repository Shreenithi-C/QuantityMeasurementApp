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
    const defaultCard = cards[0];        // Length
    const defaultAction = actionBtns[1]; // Conversion

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
    // TYPE CLICK (UC-15 basic)
    // -------------------------
    cards.forEach(card => {
        card.addEventListener("click", async () => {

            setActive(typeContainer, card, ".card");

            state.type = card.innerText.trim();
            console.log("Type:", state.type);

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
    // ACTION CLICK (UC-16 basic)
    // -------------------------
    actionBtns.forEach(btn => {
        btn.addEventListener("click", () => {

            state.action = btn.innerText.trim();

            setActive(actionContainer, btn, "button");

            // UC-13: Toggle operator
            toggleOperators(state.action === "Arithmetic");

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

        // open/close dropdown
        selectedBtn.addEventListener("click", (e) => {
            e.stopPropagation();

            optionsBox.style.display =
                optionsBox.style.display === "block" ? "none" : "block";
        });

        // select operator
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

        // close when clicking outside
        document.addEventListener("click", () => {
            optionsBox.style.display = "none";
        });
    }
});