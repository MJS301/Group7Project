let collapse = document.querySelector(".collapse_img");
let nav = document.querySelector(".navflex")

/* toggles the Navbar when user clicks on burger-bar image */
function collapseNav() {
    nav.classList.toggle("show");
}

/* Adding an event listener that initiates when the user clicks on the expand image */
collapse.addEventListener("click", collapseNav);