
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
const result1 = document.getElementById('result1');
const result2 = document.getElementById('result2');

class Planet {
    constructor(name, len_year, len_day) {
        this.name = name;
        this.len_year = len_year;
        this.len_day = len_day;
        this.days_in_year = len_year / len_day;
    }

    convert_in(hours) {
        let years = Math.floor(hours / this.len_year);
        let hours = hours - (years * this.len_year);
        let days = Math.floor(hours / this.len_day);
        hours = hours - (days * self.len_day);
        return [years, days, hours];
    }

    convert_to_hours(local_time) {
        return local_time[0] * this.len_year + local_time[1] * this.len_day + local_time[2];
    }

    convert_to_planet(time, planet) {
        return  planet.convert_in(this.convert_to_hours(time));
    }

    print_time(hours) {
        let local_time = this.convert_in(hours);
        return `${this.name}'s Date: Year ${1 + Math.floor(local_time[0])}, day ${1 + Math.floor(local_time[1])}, ${Math.floor(local_time[2])}:${Math.floor(local_time[2] % 1 * 60)}`;
    }
}

Earth = new Planet("Earth", 8765.813, 24);
Mars = new Planet("Mars", 16487.4118608, 24.6599);
Saturn = new Planet("Saturn", 258240.845, 10.55);
test_time = 17739855.401;

const planets = {
    "earth": Earth,
    "mars": Mars,
    "saturn": Saturn
};

// Add an event listener to the button
calcBtn.addEventListener("click", () => {
    result1.innerHTML = `${planets[planet1.value].print_time(test_time)}.`;
    result2.innerHTML = `${planets[planet2.value].print_time(test_time)}.`;
});

// Calculate distance between two planets
/*
async function calcDistance() {
    const dataString = document.getElementById("dateInput").value;
    const secs = dateToHoursSinceEpoch(dataString) * 3600;

    const distResponse = await fetch(`http://localhost:5000/dist?date=${secs}?p1=${planet1}?p2=sun?units=l`);
    if (!distResponse.ok) throw new Error(`HTTP error! status: ${marsResponse.status}`);
    const distData = await distResponse.json()
}
*/