function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

document.querySelectorAll("input[name='donate']").forEach(r => {
  r.addEventListener("change", () => {
    const otherBox = document.getElementById("otherAmount");
    otherBox.style.display = (r.value === "other") ? "block" : "none";
  });
});

document.querySelectorAll("input[name='dtype']").forEach(t => {
  t.addEventListener("change", () => {
    document.getElementById("acknowledgeSection").style.display = "block";
  });
});

document.getElementById("recurring").addEventListener("change", function () {
  const section = document.getElementById("recurringFields");
  section.style.display = this.checked ? "block" : "none";
  calculateRecurringTotal();
});

function calculateRecurringTotal() {
  const selected = document.querySelector("input[name='donate']:checked");
  const other = document.getElementById("otherAmount");
  const totalDisplay = document.getElementById("totalDisplay");

  if (!document.getElementById("recurring").checked) {
    totalDisplay.innerHTML = "";
    return;
  }

  let amount = 0;
  if (selected) {
    if (selected.value === "other") amount = Number(other.value || 0);
    else amount = Number(selected.value);
  }

  const freq = document.getElementById("frequency").value;

  totalDisplay.innerHTML =
    (freq === "Monthly")
      ? "Total Yearly Donation: $" + (amount * 12)
      : "Total Donation: $" + amount;
}

document.getElementById("frequency").addEventListener("change", calculateRecurringTotal);
document.getElementById("otherAmount").addEventListener("input", calculateRecurringTotal);

document.getElementById("resetBtn").addEventListener("click", function (e) {
  if (!confirm("Are you sure you want to reset the form?")) {
    e.preventDefault();
  }
});

document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const fname = document.getElementById("fname").value.trim();
  const lname = document.getElementById("lname").value.trim();
  const email = document.getElementById("mail").value.trim();
  const pass = document.getElementById("pass").value;
  const cpass = document.getElementById("cpass").value;

  if (!fname || !lname || !email || !pass) {
    alert("Please fill all required fields.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Invalid email format.");
    return;
  }

  if (pass !== cpass) {
    alert("Passwords do not match.");
    return;
  }

  alert("Form submitted successfully!");
  this.submit();
});
