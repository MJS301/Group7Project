// function for handling emission activity form submit
function addEmissionActivity(event) {
    event.preventDefault();

    const input = document.getElementById("emissionAmount");
    const message = document.getElementById("activityMessage");
    const amount = Number(input.value);

    // validate the input
    if (isNaN(amount) || amount <= 0) {
        message.textContent = "Please enter a valid emission amount.";
        message.style.display = "block";
        return;
    }


    // gives user an message and hides it
    message.textContent = `Added emission: ${amount}.`;
    message.style.display = "block";
    input.value = "";
}   

// hides the message
document.getElementById("emissionAmount").addEventListener("input", function () {
    document.getElementById("activityMessage").style.display = "none";
});