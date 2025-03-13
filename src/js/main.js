// Variables and Constants
const headHTML = `
  `;

const bodyHTML = `
  <div class="navigation">
    <a class="nav" href="../index.html">Home</a>
  </div>
  `;

const head = document.getElementsByTagName("head");

const body = document.getElementsByTagName("body");

// Navbar constants
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const navbar = document.querySelector('.navbar');

let timeout;

// Theme constants
const toggleButton = document.getElementById("theme-toggle");
const sun = document.getElementsByClassName("sun")[0];
const moon = document.getElementsByClassName("moon")[0];


// Functions

function redirect(href) {
  window.location.href = href;
}

function load(href) {
  
  document.querySelector('body').style = "animation-name: unload;" + 
                                         "animation-duration: 0.5s;";
  
  timeout = setTimeout(redirect, 500, href);
  
}

function shortcut(key, altKey, href) {
  
  keyPressed = event.key == key || event.key == altKey
  
  current = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
  
  if(keyPressed && href != current) window.location.href = href;
  
}

// Events

document.addEventListener('DOMContentLoaded', function (event) {
  document.querySelector('body').style = "animation-name: load;" +
    "animation-duration: 0.75s;";
});

// Navbar Responsiveness

hamburger.addEventListener("click", () => {
  menu.classList.toggle("active"); // Toggles the menu visibility
  navbar.classList.toggle("menu-active");
});


// Color Scheme Toggle/Detection

// Detect user preference
let currentTheme = localStorage.getItem("theme");
if (!currentTheme) {
  const prefersDarkScheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  currentTheme = prefersDarkScheme ? "dark" : "light";
}
document.body.classList.add(currentTheme);
if (document.body.classList.contains("light")) {
  moon.style.fill = "#ff990000";
  sun.style.fill = "#ff9900";
} else {
  moon.style.fill = "#ff9900";
  sun.style.fill = "#ff990000";
}

// Button toggle CSS
document.body.classList.add(`${currentTheme}`);

toggleButton.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("light") ? "dark" : "light";
  document.body.classList.remove("light", "dark");
  document.body.classList.add(newTheme);
  localStorage.setItem("theme", newTheme);

  // Reset transform if necessary (optional)
  sun.style.transform = "rotate(0deg)";
  moon.style.transform = "rotate(0deg)";

  // Trigger spin animation by adding the 'spin' class, then remove it when done
  [sun, moon].forEach((svg) => {
    // Remove class if already present so it can re-trigger the animation
    svg.classList.remove("spin");
    // Force reflow to reset the animation (optional but may help in some browsers)
    void svg.offsetWidth;
    svg.classList.add("spin");
    svg.addEventListener("animationend", function handler() {
      svg.classList.remove("spin");
      svg.removeEventListener("animationend", handler);
    });
  });

  if (document.body.classList.contains("light")) {
    moon.style.fill = "#ff990000";
    sun.style.fill = "#ff9900";
  } else {
    moon.style.fill = "#ff9900";
    sun.style.fill = "#ff990000";
  }
});


function rotateSVG(element, speed = 360) { // speed in degrees per second
  let rotation = 0;
  let lastTimestamp = null;

  function step(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const deltaTime = timestamp - lastTimestamp;
    rotation += (deltaTime * speed) / 1000; // Increase rotation based on deltaTime

    if (rotation < 360) {
      element.style.transform = `rotate(${rotation}deg)`;
      lastTimestamp = timestamp;
      requestAnimationFrame(step);
    } else {
      element.style.transform = "rotate(360deg)"; // End at a full rotation
    }
  }

  requestAnimationFrame(step);
}