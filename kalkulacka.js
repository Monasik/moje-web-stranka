// Funkce pro odeslání dat do HubSpotu
async function sendToHubSpot(data) {
    try {
        const response = await fetch('https://moje-web-stranka.vercel.app/send-to-hubspot', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log("Lead byl úspěšně odeslán do HubSpotu!");
        } else {
            console.error("Nastala chyba při odesílání leadu:", await response.text());
        }
    } catch (error) {
        console.error("Chyba při volání API:", error);
    }
}


// Zpracování formuláře pro životní pojištění
document.getElementById("ZP-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {
        properties: [
            { property: "form_source", value: formData.get("form_source") },
            { property: "age", value: formData.get("age") },
            { property: "occupation", value: formData.get("occupation") }
        ]
    };

    addSubmissionDate(data);
    await sendToHubSpot(data);
});

// Zpracování formuláře pro pojištění auta
document.getElementById("auto-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {
        properties: [
            { property: "form_source", value: formData.get("form_source") },
            { property: "coverage_type", value: formData.get("coverage-type") },
            { property: "car_value", value: formData.get("car-value") },
            { property: "annual_mileage", value: formData.get("annual-mileage") },
            { property: "anniversary_date", value: formData.get("anniversary-date") || null }
        ]
    };

    addSubmissionDate(data);
    await sendToHubSpot(data);
});

// Zpracování formuláře pro pojištění Dům/Byt
document.getElementById("nemovitost-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {
        properties: [
            { property: "form_source", value: formData.get("form_source") },
            { property: "property_type", value: formData.get("property-type") },
            { property: "house_value", value: formData.get("house-value") || null },
            { property: "household_value", value: formData.get("household-value") || null },
            { property: "last_renovation_date", value: formData.get("last-renovation-date") || null },
            { property: "property_liability", value: formData.get("property-liability") ? true : false },
            { property: "personal_liability", value: formData.get("personal-liability") ? true : false }
        ]
    };

    addSubmissionDate(data);
    await sendToHubSpot(data);
});

// Zpracování formuláře pro Ostatní pojištění
document.getElementById("ostatni-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {
        properties: [
            { property: "form_source", value: formData.get("form_source") },
            { property: "custom_request", value: formData.get("custom-request") }
        ]
    };

    addSubmissionDate(data);
    await sendToHubSpot(data);
});
