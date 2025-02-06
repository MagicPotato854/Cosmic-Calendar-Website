// Disable dropdowns in the planet comparisions
const planet1 = document.getElementById("planet1");
const planet2 = document.getElementById("planet2");

const zeroPad = (num, places) => String(num).padStart(places, "0");

// Function to update dropdown options
function updateDropdowns(changedDropdown, otherDropdown) {
  // Get the selected value
  const selectedValue = changedDropdown.value;

  // Loop through all options in the other dropdown
  Array.from(otherDropdown.options).forEach((option) => {
    // Enable all options first
    option.disabled = false;

    // Disable the selected option
    if (option.value === selectedValue) {
      option.disabled = true;
    }
  });
}

// Add event listeners to both dropdowns
planet1.addEventListener("change", () => updateDropdowns(planet1, planet2));
planet2.addEventListener("change", () => updateDropdowns(planet2, planet1));

// Get the select elements and image elements
const planet1Image = document.getElementById("planetpic1");
const planet2Image = document.getElementById("planetpic2");

// Function to update the image based on selected planet
function updatePlanetImage(selectElement, imageElement) {
  const planet = selectElement.value; // Get the selected planet's value
  imageElement.src = `src/assets/planet pictures/${planet}.png`; // Update the image source
  imageElement.alt = planet.charAt(0).toUpperCase() + planet.slice(1); // Set the alt text to match the planet name
}

// Add event listeners to update images when a planet is selected
planet1.addEventListener("change", function () {
  updatePlanetImage(planet1, planet1Image);
  result1.innerHTML = "???";
  result2.innerHTML = "???";
});

planet2.addEventListener("change", function () {
  updatePlanetImage(planet2, planet2Image);
  result1.innerHTML = "???";
  result2.innerHTML = "???";
});

// Initially set the images based on the default selected options
updatePlanetImage(planet1, planet1Image);
updatePlanetImage(planet2, planet2Image);

// Results Window Calculations

// Get Form Elements
const calcBtn = document.getElementById("calcBtn");
const result1 = document.getElementById("result1");
const result2 = document.getElementById("result2");

const planets = {
  mercury: Mercury,
  venus: Venus,
  earth: Earth,
  mars: Mars,
  jupiter: Jupiter,
  saturn: Saturn,
  neptune: Neptune,
  uranus: Uranus,
};

// Add an event listener to the button
calcBtn.addEventListener("click", () => {
  test_time = new Date().getTime() / 1000 / 3600 + 17_259_900 - 18.9962336123;
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
