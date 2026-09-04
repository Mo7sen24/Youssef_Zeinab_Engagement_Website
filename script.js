// ===============================
// GOOGLE SHEETS
// ===============================

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyf9FoCJNman4C4nVtc8R3tG1CZgc2vaDcIRp7ULy6xN2lyqHFdJ9eNBQqbNWJZZm2E/exec";


// ===============================
// RSVP
// ===============================

const rsvpForm = document.getElementById("rsvpForm");

if (rsvpForm) {

  rsvpForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const name = document.getElementById("guestName").value.trim();
    const attendance = document.getElementById("attendance").value;
    const guests = document.getElementById("guests").value;
    const message = document.getElementById("rsvpMessage");

    if (!name || !attendance) {
      message.textContent = "Please complete all required fields.";
      return;
    }

    message.textContent = "Sending your RSVP...";

    const data = {
      name: name,
      attendance: attendance,
      guests: guests
    };

    try {

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
          ? `Thank you, ${name}! We can't wait to see you ♡`
          : `Thank you for letting us know, ${name}. ♡`;

      rsvpForm.reset();

      document.getElementById("guests").value = 1;

    } catch (error) {

      console.error(error);

      message.textContent =
        "Something went wrong. Please try again.";

    }

  });

}


// ===============================
// WISHES
// ===============================

const wishForm = document.getElementById("wishForm");

if (wishForm) {

  wishForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const name = document.getElementById("wishName").value.trim();
    const wish = document.getElementById("wishMessage").value.trim();
    const response = document.getElementById("wishResponse");

    if (!name || !wish) {
      response.textContent = "Please write your name and wish.";
      return;
    }

    response.textContent = "Sending your wish...";

    const data = {
      type: "wish",
      name: name,
      message: wish
    };

    try {

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(data)
      });

      response.textContent =
        `Thank you, ${name}! Your wish means a lot to us ♡`;

      wishForm.reset();

    } catch (error) {

      console.error(error);

      response.textContent =
        "Something went wrong. Please try again.";

    }

  });

}
