document.getElementById("contactForm").onsubmit = function(event) {
    event.preventDefault();

    document.getElementById("successMessage").style.display = "block";
};