document.addEventListener("DOMContentLoaded", async () => {

    // STEP 1: Create state
    const state = {
        type: "Length",
        action: "Conversion",
        fromVal: null,
        fromUnit: "",
        toVal: null,
        toUnit: "",
        operator: "+"
    };

    // STEP 2: Attach listeners (we'll implement later)
    console.log("Event listeners attached");

    // STEP 3: Load default units
    console.log("Loading units for Length");

    // STEP 4: Set default UI active
    document.querySelector(".card").classList.add("active");
    document.querySelector(".action-box button").classList.add("active-btn");

    // STEP 5: Hide operator
    document.querySelector(".operator-container").style.display = "none";

    // STEP 6: Load history
    console.log("Loading history...");

});