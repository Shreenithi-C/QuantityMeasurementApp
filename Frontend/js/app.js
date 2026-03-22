document.addEventListener("DOMContentLoaded", async () => {
    // State
    const state = {
        type: "Length",
        action: "Conversion",
        fromVal: null,
        fromUnit: "",
        toVal: null,
        toUnit: "",
        operator: "+"
    };

    // Attach listeners (later)
    console.log("Event listeners attached");

    // Fetch units (UC-03)
    const units = await getUnits(state.type);
    console.log("Units:", units);

    console.log("Loading units for", state.type);

    // Set default active UI
    document.querySelectorAll(".card")[0].classList.add("active");
    document.querySelectorAll(".action-box button")[1].classList.add("active-btn"); 
    // index 1 = Conversion

    // Load history (later)
    console.log("Loading history...");

    // =====================================================
    // UC-04 TEST: Fetch conversion
    // =====================================================

    const conversion = await getConversion("kg", "g");
    console.log("Conversion:", conversion);

});