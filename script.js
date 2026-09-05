// ===============================
// EDIT YOUR EVENT TIME HERE
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

// ===============================
// GOOGLE SHEETS RSVP
// ===============================
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxaRG-o8eJKHEUmhcVTN2IRfCUw1kc3T4aw6YlhsJ59oA3OxcHETkqT3lZmw0ikJvTL/exec";

document.getElementById("rsvpForm").addEventListener("submit", async function (e) {
  // منع إعادة تحميل الصفحة أو الصعود لأعلى
  e.preventDefault();
  e.stopPropagation();

  const name = document.getElementById("guestName").value.trim();
  const attendance = document.getElementById("attendance").value;
  const guests = document.getElementById("guests").value;
  const message = document.getElementById("rsvpMessage");

  if (!name || !attendance) {
    message.textContent = "Please complete all required fields.";
    return false;
  }

  message.textContent = "Sending your RSVP...";

  const payload = {
    name: name,
    attendance: attendance,
    guests: guests
  };

  try {
    // إرسال البيانات كـ FormData لضمان وصولها لسيرفر Google Apps Script بدون مشاكل CORS
    const formData = new FormData();
    formData.append("name", name);
    formData.append("attendance", attendance);
    formData.append("guests", guests);

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData
    });

    // إظهار رسالة النجاح
    message.textContent =
      attendance === "yes"
        ? `Thank you, ${name}! We can't wait to see you ♡`
        : `Thank you for letting us know, ${name}. ♡`;

    // حفظ نسخة احتياطية على متصفح الزائر
    localStorage.setItem("engagementRSVP", JSON.stringify({
      name, attendance, guests, submittedAt: new Date().toISOString()
    }));

    this.reset();
    document.getElementById("guests").value = 1;

  } catch (error) {
    console.error("RSVP Error:", error);
    message.textContent = "Something went wrong. Please try again.";
  }

  return false;
});
