
// ===============================
// GOOGLE SHEETS RSVP
// ===============================

// ضع هنا رابط Google Apps Script
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyf9FoCJNman4C4nVtc8R3tG1CZgc2vaDcIRp7ULy6xN2lyqHFdJ9eNBQqbNWJZZm2E/exec";


document.getElementById("rsvpForm").addEventListener("submit", async function (e) {

  e.preventDefault();

  const name = document.getElementById("guestName").value.trim();
  const attendance = document.getElementById("attendance").value;
  const guests = document.getElementById("guests").value;
  const message = document.getElementById("rsvpMessage");

  if (!name || !attendance) {
    message.textContent = "Please complete all required fields.";
    return;
  }

  if (GOOGLE_SCRIPT_URL === "PUT_YOUR_GOOGLE_SCRIPT_URL_HERE") {
    message.textContent = "Please connect Google Sheets first.";
    return;
  }

  const data = {
    name: name,
    attendance: attendance,
    guests: guests
  };

  try {

    message.textContent = "Sending your RSVP...";

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(data)
    });

    message.textContent =
      attendance === "yes"
        ? Thank you, ${name}! We can't wait to see you ♡
        : Thank you for letting us know, ${name}. ♡;

    document.getElementById("rsvpForm").reset();
    document.getElementById("guests").value = 1;

  } catch (error) {

    console.error(error);

    message.textContent =
      "Something went wrong. Please try again.";

  }

});
