document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');
    const formMessage = document.getElementById('formMessage');

    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const feedbackText = document.getElementById('feedback').value;
        const emailInput = document.getElementById('email').value;

        // In a real application, you would send this data to a server.
        // For now, we'll just log it to the console and show a message.

        console.log('--- New Feedback Submission ---');
        console.log('Feedback:', feedbackText);
        console.log('Email:', emailInput || 'Not provided');
        console.log('-----------------------------');

        // You can integrate with a service here, e.g., Google Forms, Formspree, or a custom backend.
        // For a quick start without a backend, consider services that collect form data.

        // Simulate success:
        feedbackForm.reset(); // Clear the form fields
        formMessage.classList.remove('hidden'); // Show the thank you message

        // Optionally hide the message after a few seconds
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000); // Hide after 5 seconds
    });
});