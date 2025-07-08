document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("feedbackForm");
  const message = document.getElementById("formMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    const scriptURL = "https://script.google.com/macros/s/AKfycbwJ6f4zU55UVRXLPPbmW4oPxEQUv5fgi2qXnDFROba9ZoZ9AGUmUQmr1R3Gut_evTLEYQ/exec"; // Replace me

    fetch(scriptURL, { method: "POST", body: formData })
      .then((res) => res.json())
      .then((data) => {
        message.textContent = data.message;
        message.classList.remove("hidden");
        message.style.color = "green";
        form.reset();
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        message.textContent = "There was an unexpected error submitting your feedback. Please try again later.";
        message.classList.remove("hidden");
        message.style.color = "red";
      });
  });
});
