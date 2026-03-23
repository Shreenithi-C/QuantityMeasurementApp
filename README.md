# QuantityMeasurementApp

A web-based application to perform **unit conversion, comparison, and arithmetic operations** across multiple measurement types such as Length, Weight, Temperature, and Volume.

---

##  Features

*  Unit Conversion (e.g., km → m)
*  Comparison (greater / less / equal)
*  Arithmetic Operations (+, −, ×, ÷)
*  History Tracking (latest first)
*  Dynamic UI updates based on user actions

---

## Project Structure

```
Frontend/
│
├── index.html
├── styles.css
└── js/
    ├── app.js          # Orchestration logic
    ├── api.js          # API calls (json-server)
    ├── conversion.js   # Calculation logic
    └── ui.js           # UI handling
```

---

##  Use Case Overview

###  UC-JS-01: Create JSON Server

* Setup `db.json` as mock database
* Stores units, conversions, and history

---

###  UC-JS-02: App Initialization

* Runs on `DOMContentLoaded`
* Initializes state and loads default data

---

###  UC-JS-03: Fetch Units

* Fetch units based on selected type
* Example: Length → km, m, cm

---

###  UC-JS-04: Fetch Conversion

* Retrieves conversion factor or formula

---

###  UC-JS-05: Save History

* Saves calculation record
* Includes timestamp

---

###  UC-JS-06: Load History

* Fetches all history records
* Sorted by latest first

---

###  UC-JS-07: Apply Conversion

* Uses:

  * Factor → multiplication
  * Formula → eval()
* Returns rounded value

---

###  UC-JS-08: Compare Values

* Compares two values
* Returns readable message

---

###  UC-JS-09: Perform Arithmetic

* Applies +, −, ×, ÷
* Handles divide-by-zero

---

##  UI Module Use Cases

###  UC-JS-10: Populate Dropdown

* Dynamically fills unit options

###  UC-JS-11: Set Active Button

* Highlights selected UI element

###  UC-JS-12: Show Result

* Displays result with animation

###  UC-JS-13: Toggle Operator Row

* Shows operators only for Arithmetic

###  UC-JS-14: Render History

* Displays history list or empty message

---

##  Orchestration (app.js)

###  UC-JS-15: Handle Type Click

* Updates type
* Reloads units
* Clears inputs & result

###  UC-JS-16: Handle Action Click

* Updates mode (Conversion / Comparison / Arithmetic)
* Toggles operator UI
* Resets result

###  UC-JS-17: Execute Calculation

* Triggered on input/select change
* Performs:

  * Conversion
  * Comparison
  * Arithmetic
* Displays result
* Saves history
* Refreshes history

---

##  How to Run

1. Install json-server:

   ```
   npm install -g json-server
   ```

2. Start backend:

   ```
   json-server --watch db.json --port 3000
   ```

3. Open `index.html` in browser

---

##  Conclusion

This app demonstrates:

* Clean modular JavaScript
* Async API handling
* UI + logic separation
* Real-world problem solving

---

