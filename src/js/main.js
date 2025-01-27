// Node

// ???

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

let testInp = '';

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

// Set Elements

// for(let i = 0; i < head.length; i++) head[i].innerHTML += headHTML;

// for(let i = 0; i < body.length; i++) body[i].innerHTML += bodyHTML;

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

// Transitions

window.onload = () => {
  const transition_el = document.querySelector('.transition');
  const anchors = document.querySelectorAll('a');

  setTimeout(() => {
    transition_el.classList.remove('is-active');
  }, 500);

  for (let i = 0; i < anchors.length; i++) {
    const anchor = anchors[i];

    anchor.addEventListener('click', e => {
      e.preventDefault();
      let target = e.target.href;

      transition_el.classList.add('is-active');

      setTimeout(() => {
        window.location.href = target;
      }, 500);
    });
  }
}