
// Disable dropdowns in the planet comparisions
const planet1 = document.getElementById('planet1');
const planet2 = document.getElementById('planet2');

// Function to update dropdown options
function updateDropdowns(changedDropdown, otherDropdown) {
    // Get the selected value
    const selectedValue = changedDropdown.value;

    // Loop through all options in the other dropdown
    Array.from(otherDropdown.options).forEach(option => {
        // Enable all options first
        option.disabled = false;

        // Disable the selected option
        if (option.value === selectedValue) {
            option.disabled = true;
        }
    });
}

// Add event listeners to both dropdowns
planet1.addEventListener('change', () => updateDropdowns(planet1, planet2));
planet2.addEventListener('change', () => updateDropdowns(planet2, planet1));

// Get the select elements and image elements
const planet1Image = document.getElementById('planetpic1');
const planet2Image = document.getElementById('planetpic2');

// Function to update the image based on selected planet
function updatePlanetImage(selectElement, imageElement) {
    const planet = selectElement.value; // Get the selected planet's value
    imageElement.src = `src/assets/planet pictures/${planet}.png`; // Update the image source
    imageElement.alt = planet.charAt(0).toUpperCase() + planet.slice(1); // Set the alt text to match the planet name
}

// Add event listeners to update images when a planet is selected
planet1.addEventListener('change', function() {
    updatePlanetImage(planet1, planet1Image);
});

planet2.addEventListener('change', function() {
    updatePlanetImage(planet2, planet2Image);
});

// Initially set the images based on the default selected options
updatePlanetImage(planet1, planet1Image);
updatePlanetImage(planet2, planet2Image);


// Results Window Calculations

// Get Form Elements
const calcBtn = document.getElementById('calcBtn');
const result = document.getElementById('result');

// Add an event listener to the button
calcBtn.addEventListener("click", () => {
    result.innerHTML = `${planet1.value} and ${planet2.value}`;
});