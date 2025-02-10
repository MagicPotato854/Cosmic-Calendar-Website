// Disable dropdowns in the planet comparisions

planet1 = "earth";
planet2 = "mars";

const capitalizeFirstLetter = word => word.charAt(0).toUpperCase() + word.slice(1);
const zeroPad = (num, places) => String(num).padStart(places, "0");

// Function to update dropdown options


// Get the select elements and image elements
const planet1Image = document.getElementById("planetpic1");
const planet2Image = document.getElementById("planetpic2");

const dropdownbtn1 = document.getElementById("dropdownbtn1");
const dropdownbtn2 = document.getElementById("dropdownbtn2");

// Function to update the image based on selected planet
function updatePlanetImage(selectElement, imageElement, button) {
  const planet = selectElement; // Get the selected planet's value
  button.innerHTML = capitalizeFirstLetter(selectElement);

  imageElement.src = `src/assets/planet pictures/${planet}.png`; // Update the image source
  imageElement.alt = planet.charAt(0).toUpperCase() + planet.slice(1); // Set the alt text to match the planet name
}

// Function to update the time conversion
function updateTimeConversion() {
  const test_time = new Date().getTime() / 1000 / 3600 + 17_259_900 - 18.9962336123;
  result1.innerHTML = `${planets[planet1].print_time(test_time)}.`;
  result2.innerHTML = `${planets[planet2].print_time(test_time)}.`;
}

// Initially set the images based on the default selected options
updatePlanetImage(planet1, planet1Image, dropdownbtn1);
updatePlanetImage(planet2, planet2Image, dropdownbtn2);

// Results Window Calculations

// Get Form Elements
const result1 = document.getElementById("result1");
const result2 = document.getElementById("result2");

class Planet {
  constructor(name, len_year, len_day) {
    this.name = name;
    this.len_year = len_year;
    this.len_day = len_day;
    this.days_in_year = len_year / len_day;
    this.day_digits = Math.floor(len_day).toString().length;
  }

  convert_in(totalHours) {
    let years = Math.floor(totalHours / this.len_year);
    let remainingHours = totalHours - years * this.len_year;
    let days = Math.floor(remainingHours / this.len_day);
    let finalHours = remainingHours - days * this.len_day;
    return [years, days, finalHours];
  }

  convert_to_hours(local_time) {
    return (
      local_time[0] * this.len_year +
      local_time[1] * this.len_day +
      local_time[2]
    );
  }

  convert_to_planet(time, planet) {
    return planet.convert_in(this.convert_to_hours(time));
  }

  print_time(hours) {
    if (this.name == "Earth") {
      const baseDate = new Date('0001-01-01T00:00:00Z');
      const date = new Date(baseDate.getTime() + hours * 3600 * 1000);
      return `Earth's Date: ${date.toUTCString()}`;
    }
    let local_time = this.convert_in(hours);
    let hour = Math.floor(local_time[2]);
    let minute = Math.floor((local_time[2] % 1) * 60);

    return `${this.name}'s Date: Year ${1 + Math.floor(local_time[0])}, day ${
      1 + Math.floor(local_time[1])
    }, ${hour.toString().padStart(this.day_digits, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  }
}

// Create Planet Objects
Mercury = new Planet("Mercury", 2_111.28, 4_223.28);
Venus = new Planet("Venus", 5_392.8, 2_802);
Earth = new Planet("Earth", 8_765.82335025, 24);
Mars = new Planet("Mars", 16_487.4118608, 24.65979);
Jupiter = new Planet("Jupiter", 103_982.16, 10.55);
Saturn = new Planet("Saturn", 258_240.845, 9.933);
Neptune = new Planet("Neptune", 1_444_530.151, 16.1);
Uranus = new Planet("Uranus", 736_449.6, 17.233);

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

const dropdownContent1 = document.getElementById("dropdown-content1");
const dropdownContent2 = document.getElementById("dropdown-content2");

dropdownbtn1.addEventListener("click", function() {
  if (dropdownContent2.style.display != "grid") {
    dropdownContent1.style.display = "grid";
  }
});

dropdownbtn2.addEventListener("click", function() {
  if (dropdownContent1.style.display != "grid") {
    dropdownContent2.style.display = "grid";
  }
});

// Function to hide dropdown content
function hideDropdown(dropdownContent) {
    dropdownContent.style.display = "none";
}

// Add event listeners to each planet in dropdown-content1
const planets1 = document.querySelectorAll('#dropdown-content1 .dropdown-content');
planets1.forEach(planet => {
    planet.addEventListener('click', () => {
        hideDropdown(dropdownContent1);
        planet1 = planet.querySelector('label').textContent.toLowerCase();
        updatePlanetImage(planet1, planet1Image, dropdownbtn1);
        updateTimeConversion();
    });
});

// Add event listeners to each planet in dropdown-content2
const planets2 = document.querySelectorAll('#dropdown-content2 .dropdown-content');
planets2.forEach(planet => {
    planet.addEventListener('click', () => {
        hideDropdown(dropdownContent2);
        planet2 = planet.querySelector('label').textContent.toLowerCase();
        updatePlanetImage(planet2, planet2Image, dropdownbtn2);
        updateTimeConversion();
    });
});
// ...existing code...

// loop through each of the planets in the dropdown modal to add event listeners to style.display to none


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
