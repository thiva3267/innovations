<script>
    
    const form = document.getElementById('feedbackForm');
    const message = document.getElementById('formMessage');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get values
        const feedback = document.getElementById('feedback').value.trim();
        const email = document.getElementById('email').value.trim();

        // Validate before sending
        if (!feedback || !email) {
            message.textContent = "⚠️ Please fill out both fields.";
            message.classList.remove("hidden");
            message.style.color = "red";
            return;
        }

        
        const scriptURL = "https://script.google.com/macros/s/AKfycbwJ6f4zU55UVRXLPPbmW4oPxEQUv5fgi2qXnDFROba9ZoZ9AGUmUQmr1R3Gut_evTLEYQ/exec";

        try {
            // Disable the form while submitting
            form.querySelector('button[type="submit"]').disabled = true;

            const response = await fetch(scriptURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ feedback, email })
            });

            if (response.ok) {
                const resData = await response.json();
                if (resData.success) {
                    message.textContent = "✅ Thank you! Your feedback has been submitted.";
                    message.style.color = "green";
                    form.reset();
                } else {
                    throw new Error(resData.message || "Unexpected response");
                }
            } else {
                const errorText = await response.text();
                throw new Error(`Server responded with status ${response.status}: ${errorText}`);
            }

        } catch (err) {
            console.error("Fetch error:", err);
            message.textContent = `❌ Error submitting feedback. Please try again.\nDetails: ${err.message}`;
            message.style.color = "red";
        } finally {
            form.querySelector('button[type="submit"]').disabled = false;
            message.classList.remove("hidden");
        }
    });
</script>
