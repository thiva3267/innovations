document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('feedbackForm');
    const message = document.getElementById('formMessage');

    // Your Google Apps Script Web App URL
    // IMPORTANT: Replace this with your actual deployed Google Apps Script URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzl0sfYD-qL97TsiLa3jPtbxUTT1U3TQsDYwDHrIYGBmaDc-nvxd-3qY113HBIxl85mhA/exec';

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        // Display a "submitting" message
        message.textContent = 'Submitting your feedback...';
        message.classList.remove('hidden', 'success', 'error'); // Clear previous states
        message.classList.add('info'); // Optional: add an 'info' class for submitting state styling

        const formData = new FormData(form);

        fetch(scriptURL, {
            method: 'POST',
            body: formData // Send form data directly
        })
        .then(response => {
            // Check if the response was successful (HTTP status 2xx)
            if (!response.ok) {
                // If not successful, throw an error to be caught by the .catch block
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Google Apps Script usually returns a success/error JSON object.
            // If it returns plain text, response.json() will throw an error,
            // which will also be caught below.
            return response.json();
        })
        .then(result => {
            // Assuming your Google Apps Script returns { status: "success", message: "..." }
            if (result.status === 'success') {
                message.textContent = result.message || 'Thank you for your input!';
                message.classList.remove('hidden', 'info', 'error');
                message.classList.add('success');
                form.reset(); // Clear the form fields on success
            } else {
                // Handle cases where the script returns an error status
                message.textContent = result.message || 'There was an error submitting your feedback.';
                message.classList.remove('hidden', 'info', 'success');
                message.classList.add('error');
            }
        })
        .catch(error => {
            console.error('Submission error:', error);
            message.textContent = 'There was an unexpected error submitting your feedback. Please try again later.';
            message.classList.remove('hidden', 'info', 'success');
            message.classList.add('error');
        });
    });
});
