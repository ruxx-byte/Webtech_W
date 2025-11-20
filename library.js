document.getElementById("addBookBtn").addEventListener("click", addBook);

function addBook() {
    const titleInput = document.getElementById("bookTitle").value.trim();
    const yearInput = document.getElementById("bookYear").value.trim();
    const currentYear = new Date().getFullYear();

    // Title validation: only alphabetic, no spaces
    const titleRegex = /^[A-Za-z]+$/;

    if (!titleRegex.test(titleInput)) {
        alert("Title must contain only alphabetic characters with no spaces.");
        return;
    }

    // Year validation: 4-digit number between 1900 and current year
    const yearNumber = parseInt(yearInput, 10);

    if (!/^\d{4}$/.test(yearInput) || yearNumber < 1900 || yearNumber > currentYear) {
        alert("Year must be a valid 4-digit number between 1900 and " + currentYear + ".");
        return;
    }

    // Add new row dynamically
    const tableBody = document.getElementById("bookTable").querySelector("tbody");
    const newRow = document.createElement("tr");

    // Color based on year
    if (yearNumber < 2000) {
        newRow.classList.add("old-book");
    } else {
        newRow.classList.add("new-book");
    }

    newRow.innerHTML = `
        <td>${titleInput}</td>
        <td>${yearNumber}</td>
    `;

    tableBody.appendChild(newRow);

    // Clear input fields
    document.getElementById("bookTitle").value = "";
    document.getElementById("bookYear").value = "";
}
