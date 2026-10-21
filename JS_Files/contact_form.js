document.getElementById("contactForm").onsubmit = function(event) {
    event.preventDefault();

    document.getElementById("successMessage").style.display = "block";
};

/*
let contactForm = document.getElementById("contactForm");
let successMessage = document.getElementById("successMessage");
let errorMessage = document.getElementById("errorMessage");

contactForm.addEventListener("submit", sendContact);

async function sendContact(event) {
    // stops page from being reloaded when form is submitted
    event.preventDefault();

    // hides any messages from a previous attempt
    successMessage.style.display = "none";
    errorMessage.style.display = "none";

    try {
        let response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
            method: "POST",
            body: new FormData(contactForm),
            headers: { "Accept": "application/json" }
        });

        if (response.ok) {
            // only shown if the message was actually sent
            successMessage.style.display = "block";
            contactForm.reset();
        } else {
            errorMessage.style.display = "block";
        }
    } catch (error) {
        // runs if the network is down or the request is blocked
        errorMessage.style.display = "block";
    }
}
*/