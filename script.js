<script>
const form = document.getElementById('feedbackForm');
const message = document.getElementById('formMessage');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const feedback = document.getElementById('feedback').value;
  const email = document.getElementById('email').value;

  const scriptURL = "YOUR_GOOGLE_SCRIPT_WEB_APP_URL";  // ← paste your script URL here

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feedback, email })
    });

    if (response.ok) {
      message.textContent = "✅ Thank you! Your feedback has been submitted.";
      message.classList.remove("hidden");
      form.reset();
    } else {
      throw new Error("Submission failed.");
    }
  } catch (err) {
    console.error(err);
    message.textContent = "❌ Error submitting feedback. Please try again.";
    message.classList.remove("hidden");
  }
});
</script>
