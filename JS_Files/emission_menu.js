let emissions = [];        // the list of emission amounts
let editingIndex = null;   // which row is being edited (null = none)

// example data for testing
emissions = [3,4,123,5,12,451,142,34,234,2,432]

// function to add a new emission amount
function addEmission(amount) {
    emissions.push(amount);
    renderTable();
}

// function to remove an emission amount by looking at the index of the row in the table
function removeEmission(index) {
    emissions.splice(index, 1);
    editingIndex = null;
    renderTable();
}

// function to start editing a row
function startEdit(index) {
    editingIndex = index;
    renderTable();
}

// function to save the edited emission amount
function saveEdit(index) {
    const newAmount = parseFloat(document.getElementById("editInput").value);

    if (isNaN(newAmount) || newAmount <= 0) {
        alert("Please enter a valid emission amount.");
        return;
    }

    emissions[index] = newAmount;
    editingIndex = null;
    renderTable();
}

// function to cancel editing
function cancelEdit() {
    editingIndex = null;
    renderTable();
}

// function to make a button element in the table 
function makeButton(text, className, onClick) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = text;
    btn.className = className;
    btn.addEventListener("click", onClick);
    return btn;
}

// function to render the emission table
function renderTable() {
    const body = document.getElementById("emissionTableBody");
    body.innerHTML = "";

    // if there are no emissions show a message
    if (emissions.length === 0) {
        const row = body.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 3;
        cell.textContent = "No emissions added yet.";
        cell.className = "emptyRow";
    }

    // for each emission amount, create a row in the table
    emissions.forEach((amount, i) => {
        const row = body.insertRow();
        row.insertCell().textContent = i + 1;

        const amountCell = row.insertCell();
        const actionsCell = row.insertCell();

        // if index is the one being edited then show input field and save/cancel buttons
        if (i === editingIndex) {
            const editInput = document.createElement("input");
            editInput.type = "number";
            editInput.id = "editInput";
            editInput.value = amount;
            editInput.min = "0";
            editInput.step = "any";
            editInput.className = "editInput";
            amountCell.appendChild(editInput);

            actionsCell.appendChild(makeButton("Save", "tableButton saveButton", () => saveEdit(i)));
            actionsCell.appendChild(makeButton("Cancel", "tableButton", cancelEdit));
        } else {
            amountCell.textContent = amount;

            actionsCell.appendChild(makeButton("Edit", "tableButton", () => startEdit(i)));
            actionsCell.appendChild(makeButton("Remove", "tableButton removeButton", () => removeEmission(i)));
        }
    });

    // calculate and display the total emissions
    const total = emissions.reduce((sum, value) => sum + value, 0);
    document.getElementById("emissionTotal").textContent = total.toFixed(2);
}

// create table when the page loads
renderTable();