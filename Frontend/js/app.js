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

    // UC-03
    const units = await getUnits(state.type);
    console.log("Units:", units);

    // Default UI
    document.querySelectorAll(".card")[0].classList.add("active");
    document.querySelectorAll(".action-box button")[1].classList.add("active-btn");

    // UC-06 
    console.log("Loading history...");
    const history = await getHistory();
    console.log("History:", history);

    //UC-08
    const result = compareValues(
    1, "km",
    500, "m",
    1000,   // base1 (1 km → 1000 m)
    500     // base2 (500 m → 500 m)
    );

    console.log("Compare:", result);
});