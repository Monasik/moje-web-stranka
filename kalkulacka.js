// Funkce pro zobrazení příslušného formuláře
function showForm(formId) {
    const forms = document.querySelectorAll('.calculator-form, .non-life-sub-form');
    forms.forEach(form => form.style.display = 'none');

    document.getElementById(formId).style.display = 'block';
}

// Funkce pro zobrazení podformulářů pro neživotní pojištění
function showNonLifeSubForm(formId) {
    const subForms = document.querySelectorAll('.non-life-sub-form');
    subForms.forEach(form => form.style.display = 'none');

    document.getElementById(formId).style.display = 'block';
}

// Funkce pro zobrazení specifických polí pro Dům nebo Byt
document.getElementById('property-type').addEventListener('change', function() {
    const selectedType = this.value;
    const houseForm = document.getElementById('house-form');
    const apartmentForm = document.getElementById('apartment-form');

    // Skryjeme oba formuláře
    houseForm.style.display = 'none';
    apartmentForm.style.display = 'none';

    // Zobrazíme formulář podle výběru
    if (selectedType === 'house') {
        houseForm.style.display = 'block';
    } else if (selectedType === 'apartment') {
        apartmentForm.style.display = 'block';
    }
});

// Zajistíme, že formulář pro Dům bude viditelný po načtení stránky
document.addEventListener('DOMContentLoaded', function() {
    const propertyType = document.getElementById('property-type');
    const houseForm = document.getElementById('house-form');
    const apartmentForm = document.getElementById('apartment-form');

    // Zkontrolujeme, že se výchozí hodnota nastaví správně a zobrazíme formulář pro Dům
    propertyType.value = 'house';
    houseForm.style.display = 'block';
    apartmentForm.style.display = 'none';
});

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
    "form_source": formData.get("form_source"),
    "age": formData.get("age"),
    "occupation": formData.get("occupation")
  }

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

        function toggleMenu() {
            const navMenu = document.getElementById('nav-menu');
            navMenu.classList.toggle('active');
       } 
