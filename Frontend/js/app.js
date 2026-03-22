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

    await saveHistory({
    type: "Length",
    action: "Conversion",
    expression: "1 km → m",
    result: 1000,
    timestamp: new Date().toISOString()
});

});