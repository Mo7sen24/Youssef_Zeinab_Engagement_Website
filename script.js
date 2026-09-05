

// ===============================
// EDIT YOUR EVENT TIME HERE
// Example: "20:00" means 8:00 PM.
// The countdown uses Cairo local time.
// ===============================
const EVENT_TIME = "20:00";
const EVENT_TIME_LABEL = "8:00 PM";

// Event date: 16 September 2026
const eventDate = new Date(`2026-09-16T${EVENT_TIME}:00`);

document.getElementById("eventTimeText").textContent = EVENT_TIME_LABEL;
document.getElementById("timeCard").innerHTML = EVENT_TIME_LABEL;

function updateCountdown() {
  const now = new Date();
  const difference = eventDate - now;

  if (difference <= 0) {
    document.getElementById("countdown").innerHTML =
      '<p class="eyebrow">THE DAY IS HERE ♡</p>';
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

// RSVP demo: saves the guest response in this browser.
// For real online RSVP collection, connect the form to a backend,
// Google Forms, Formspree, Supabase, Firebase, etc.
document.getElementById("rsvpForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("guestName").value.trim();
  const attendance = document.getElementById("attendance").value;
  const guests = document.getElementById("guests").value;
  const message = document.getElementById("rsvpMessage");

  if (!name || !attendance) return;

  localStorage.setItem("engagementRSVP", JSON.stringify({
    name, attendance, guests, submittedAt: new Date().toISOString()
  }));

  message.textContent = attendance === "yes"
    ? `Thank you, ${name}! We can't wait to see you ♡`
    : `Thank you for letting us know, ${name}. ♡`;

  this.reset();
  document.getElementById("guests").value = 1;
});
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
