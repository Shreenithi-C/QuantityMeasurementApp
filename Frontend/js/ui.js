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

function setActive(parentEl, clickedEl, childSelector) {

    if (!parentEl) return;

    // remove active from all
    parentEl.querySelectorAll(childSelector).forEach(el => {
        el.classList.remove("active");
        el.classList.remove("active-btn"); // for buttons
    });

    // add active to clicked
    clickedEl.classList.add("active");

    // for buttons (action buttons)
    if (clickedEl.tagName === "BUTTON") {
        clickedEl.classList.add("active-btn");
    }
}

function showResult(value, unitSymbol) {

    const valueEl = document.querySelector("#result-value");
    const unitEl = document.querySelector("#result-unit");

    if (!valueEl || !unitEl) {
        console.warn("Result elements not found");
        return;
    }

    // handle null
    if (value === null || value === undefined) {
        valueEl.textContent = "—";
        unitEl.textContent = "";
        return;
    }

    // set values
    valueEl.textContent = value;
    unitEl.textContent = unitSymbol || "";

    // highlight effect
    valueEl.classList.add("highlight");

    setTimeout(() => {
        valueEl.classList.remove("highlight");
    }, 1500);
}

function toggleOperators(show) {
    const el = document.querySelector("#operator-selector");

    if (!el) {
        console.warn("Operator not found");
        return;
    }

    el.style.display = show ? "flex" : "none";
}