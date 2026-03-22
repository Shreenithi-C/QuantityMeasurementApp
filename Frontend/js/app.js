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

    // ---------------
    // CLICK HANDLING 
    // ---------------

    // Type cards
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", () => {
            setActive(typeContainer, card, ".card");
        });
    });

    // Action buttons
    document.querySelectorAll(".action-box button").forEach(btn => {
        btn.addEventListener("click", () => {
            setActive(actionContainer, btn, "button");
        });
    });

    // showResult(1000, "m");
});