const BASE_URL = "http://localhost:3000";

async function getUnits(type) {
    try {
        const res = await fetch(`${BASE_URL}/units?type=${type}`);

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        return data;

    } catch (error) {
        console.error("Error fetching units:", error);
        return [];
    }
}

async function getConversion(from, to) {
    try {
        const res = await fetch(`${BASE_URL}/conversions?from=${from}&to=${to}`);

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        // json-server returns array always
        if (!data.length) {
            throw new Error("No conversion found");
        }

        return data[0]; // return single object

    } catch (error) {
        console.error("Error fetching conversion:", error);
        return null;
    }
}