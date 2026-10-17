const goalFrom = document.getElementById("goal-form")
const goalsList = document.getElementById("goals-list")
const formMessage = document.getElementById("form-result")

//Following line of code is performed when user presses create goal button

goalFrom.addEventListener("submit", function (event) {
    event.preventDefault();

    //Gather form values

    const title = document.getElementById("goal-title").value.trim();
    const category = document.getElementById("goal-category").value;
    const description = document.getElementById("goal-description").value.trim();

    //Check required fields are filled out

    if (!title || !category) {
        formMessage.textContent = "Please enter a title and select a category";
        return;
    }

    //Remove empty message awaiting new goal
    const emptyMessage = goalsList.querySelector(".empty-message");

    if (emptyMessage) {
        emptyMessage.remove();
    }

    //Creates a goal card
    const goalCard = document.createElement("article");
    goalCard.className = "goal-card";

    //Add title to the card

    const goalTitle = document.createElement("h3");
    goalTitle.textContent = title;
    goalCard.appendChild(goalTitle);

    //Add the category to the card

    const goalCategory = document.createElement("p");
    goalCategory.className = "goal-category";
    goalCategory.textContent = category;
    goalCard.appendChild(goalCategory);

    //If a description was entered then it is added to the card
    if (description) {
        const goalDescription = document.createElement("p");
        goalDescription.className = "goal-description";
        goalDescription.textContent = description;
        goalCard.appendChild(goalDescription);
    }

    //Displays the new created goal
    goalsList.appendChild(goalCard);

    goalFrom.reset();

    formMessage.textContent = "Goal Created Successfully"

});