let collapse = document.querySelector(".nav_collapse");
let nav = document.querySelector("#main_nav")

/* toggles the Navbar when user clicks on burger-bar image */
function collapseNav() {
    nav.classList.toggle("show");
}

/* Adding an event listener that initiates when the user clicks on the expand image */
collapse.addEventListener("click", collapseNav);