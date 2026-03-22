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

    // -------------------------
    // DEFAULT ACTIVE (UC-11)
    // -------------------------
    const defaultCard = document.querySelectorAll(".card")[0]; // Length
    const defaultAction = document.querySelectorAll(".action-box button")[1]; // Conversion

    setActive(typeContainer, defaultCard, ".card");
    setActive(actionContainer, defaultAction, "button");

    // -------------------------
    // UC-13: HIDE OPERATOR INITIALLY
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
    } catch (err) {
        console.error("Error loading history:", err.message);
    }

    // -------------------------
    // TYPE CLICK (UC-15 basic)
    // -------------------------
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", async () => {

            setActive(typeContainer, card, ".card");

            state.type = card.innerText.trim();
            console.log("Type:", state.type);

            // reload units when type changes
            const units = await getUnits(state.type);
            populateDropdown(fromSelect, units);
            populateDropdown(toSelect, units);
        });
    });

    // -------------------------
    // ACTION CLICK (UC-16 basic)
    // -------------------------
    document.querySelectorAll(".action-box button").forEach(btn => {
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

        // Toggle dropdown
        selectedBtn.addEventListener("click", () => {
            optionsBox.style.display =
                optionsBox.style.display === "block" ? "none" : "block";
        });

        // Select operator
        options.forEach(btn => {
            btn.addEventListener("click", () => {
                selectedBtn.textContent = btn.textContent;
                state.operator = btn.textContent;
                optionsBox.style.display = "none";

                console.log("Operator:", state.operator);
            });
        });

        // Close when clicking outside
        document.addEventListener("click", (e) => {
            if (!e.target.closest("#operator-selector")) {
                optionsBox.style.display = "none";
            }
        });
    }
});