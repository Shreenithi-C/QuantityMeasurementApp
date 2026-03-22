function populateDropdown(selectEl, units) {

    // if element not found
    if (!selectEl) {
        console.warn("Dropdown element not found");
        return;
    }

    // 1. clear existing
    selectEl.innerHTML = "";

    // 2. default option
    const defaultOpt = document.createElement("option");
    defaultOpt.textContent = "-- Select Unit --";
    defaultOpt.disabled = true;
    defaultOpt.selected = true;
    selectEl.appendChild(defaultOpt);

    // 3. add units
    units.forEach(u => {
        const opt = document.createElement("option");
        opt.value = u.symbol;
        opt.textContent = `${u.label} (${u.symbol})`;
        selectEl.appendChild(opt);
    });
}