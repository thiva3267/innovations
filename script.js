document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('feedbackForm');
  const message = document.getElementById('formMessage');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    // Replace this URL with your actual Google Apps Script Web App URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwJ6f4zU55UVRXLPPbmW4oPxEQUv5fgi2qXnDFROba9ZoZ9AGUmUQmr1R3Gut_evTLEYQ/exec';

    fetch(scriptURL, { method: 'POST', body: formData })
      .then(response => response.json())
      .then(result => {
        message.textContent = 'Thank you for your input!';
        message.classList.remove('hidden');
        message.classList.add('success');
        form.reset();
      })
      .catch(error => {
        console.error('Submission error:', error);
        message.textContent = 'There was an error submitting your feedback. Please try again later.';
        message.classList.remove('hidden');
        message.classList.add('error');
      });
  });
});
