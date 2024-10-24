function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
}

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

    console.log(`Selected type: ${selectedType}`);  // Přidáme výpis pro sledování

    // Skryjeme oba formuláře
    houseForm.style.display = 'none';
    apartmentForm.style.display = 'none';

    // Zobrazíme formulář podle výběru
    if (selectedType === 'house') {
        console.log('Displaying house form');
        houseForm.style.display = 'block';
    } else if (selectedType === 'apartment') {
        console.log('Displaying apartment form');
        apartmentForm.style.display = 'block';
    }
});

// Zajistíme, že formulář pro Dům bude viditelný po načtení stránky
document.addEventListener('DOMContentLoaded', function() {
    const propertyType = document.getElementById('property-type');
    const houseForm = document.getElementById('house-form');
    const apartmentForm = document.getElementById('apartment-form');

    console.log('Setting default form to house');
    
    // Zkontrolujeme, že se výchozí hodnota nastaví správně a zobrazíme formulář pro Dům
    propertyType.value = 'house';
    houseForm.style.display = 'block';
    apartmentForm.style.display = 'none';
});
