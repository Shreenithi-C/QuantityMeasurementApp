document.addEventListener("DOMContentLoaded", async () => {

    const state = {
        type: "Length",
        action: "Conversion",
        fromVal: null,
        fromUnit: "",
        toVal: null,
        toUnit: "",
        operator: "+"
    };

    console.log("Event listeners attached");

    // ✅ GET UNITS (only once)
    const units = await getUnits(state.type);
    console.log("Units:", units);

    // ✅ POPULATE DROPDOWN
    const fromSelect = document.querySelector("#from-unit");
    const toSelect = document.querySelector("#to-unit");

    populateDropdown(fromSelect, units);
    populateDropdown(toSelect, units);

    // ✅ DEFAULT UI
    document.querySelectorAll(".card")[0].classList.add("active");
    document.querySelectorAll(".action-box button")[1].classList.add("active-btn");

    // ✅ LOAD HISTORY
    console.log("Loading history...");
    const history = await getHistory();
    console.log("History:", history);
});