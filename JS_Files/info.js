'use strict';

// headings are picked using the existing class names
let headings = document.querySelectorAll(
  ".footprint_info_header h2, .solutions_info_header h2, .faq_header h2"
);

for (let i = 0; i < headings.length; i++) {
  // makes the headings work with the keyboard and screen readers
  headings[i].setAttribute("tabindex", "0");
  headings[i].setAttribute("role", "button");
  headings[i].setAttribute("aria-expanded", "false");

  headings[i].addEventListener("click", toggleSection);
  headings[i].addEventListener("keydown", keyToggle);
}

// lets Enter and Space open a section, like a button would
function keyToggle(evt) {
  if (evt.key === "Enter" || evt.key === " ") {
    evt.preventDefault();
    toggleSection(evt);
  }
}

function toggleSection(evt) {
  let clicked = evt.currentTarget;
  let wasOpen = clicked.getAttribute("aria-expanded") === "true";

  // closes every section first, so only one is open at a time
  for (let i = 0; i < headings.length; i++) {
    headings[i].setAttribute("aria-expanded", "false");
    headings[i].parentElement.nextElementSibling.classList.remove("show");
  }

  // opens the clicked one, unless it was already open
  if (wasOpen === false) {
    clicked.setAttribute("aria-expanded", "true");
    clicked.parentElement.nextElementSibling.classList.add("show");
  }
}