
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const addContactBtn = document.getElementById("add-contact-btn");
const contactsList = document.getElementById("contacts"); 
const errorMessage = document.getElementById("error-message");
const clearBtn = document.getElementById("clear-btn")

addContactBtn.addEventListener('click', contactAdd);

//Funktion för validering som kollar så att textfälten inte är tomma.
//Kollar dock inte om phoneInput faktiskt är ett nummer (stod inte i kraven).
function contactValidate(name, phone) {
    if (!name || !phone) {
        errorMessage.textContent = "Både namn och telefonnummer måste fyllas i!";
        return false;
    }
    errorMessage.textContent = "";
    return true;
}

function contactDelete(contactItem) {
    contactsList.removeChild(contactItem);
}

function contactEdit(nameField, phoneField, editBtn) {
    if (editBtn.textContent === "Ändra") {
        nameField.disabled = false;
        phoneField.disabled = false;
        editBtn.textContent = "Spara";
    } else {
        if (contactValidate(nameField.value, phoneField.value)) {
            nameField.disabled = true;
            phoneField.disabled = true;
            editBtn.textContent = "Ändra";
        } else {
            errorMessage.textContent = "Får ej spara tom kontakt!";
        }
    }
}

function contactAdd () {
    const name = nameInput.value;
    const phone = phoneInput.value;

    if (!contactValidate(name, phone)) {
        return;
    }

    const contactItem = document.createElement("li");
    const nameField = document.createElement("input");
    nameField.type = "text";
    nameField.value = name;
    nameField.disabled = true;

    const phoneField = document.createElement("input");
    phoneField.type = "text";
    phoneField.value = phone;
    phoneField.disabled = true;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Ändra";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Radera";

    editBtn.addEventListener('click', function() {
        contactEdit(nameField, phoneField, editBtn);
    });
    deleteBtn.addEventListener('click', function() {
        contactDelete(contactItem);
    });

    contactItem.append(nameField, phoneField, editBtn, deleteBtn);
    contactsList.appendChild(contactItem);

    nameInput.value = "";
    phoneInput.value = "";

    errorMessage.textContent = "";
    
}

function contactClear() {
    contactsList.innerHTML = "";
}

clearBtn.addEventListener('click', contactClear);