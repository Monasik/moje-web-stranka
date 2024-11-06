// Funkce pro odeslání dat do HubSpotu
async function sendToHubSpot(data) {
    try {
        const response = await fetch('https://moje-web-stranka.vercel.app/send-to-hubspot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Formulář byl úspěšně odeslán.');
        } else {
            alert('Něco se pokazilo. Zkuste to znovu.');
        }
    } catch (error) {
        console.error('Chyba při odesílání:', error);
        alert('Něco se pokazilo. Zkuste to znovu.');
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
            { property: "cisty_mesicni_prijem", value: formData.get("cisty_mesicny_prijem") }
            { property: "firstname", value: formData.get("firstname") }
            { property: "city", value: formData.get("city") }
            { property: "phone", value: formData.get("phone") }
            { property: "region", value: formData.get("region") }
        ]
    };

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

    await sendToHubSpot(data);
});
