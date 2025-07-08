document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedbackForm');
  const message = document.getElementById('formMessage');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    const scriptURL = 'https://script.google.com/macros/s/AKfycbwJ6f4zU55UVRXLPPbmW4oPxEQUv5fgi2qXnDFROba9ZoZ9AGUmUQmr1R3Gut_evTLEYQ/exec'; // replace with your actual URL

    fetch(scriptURL, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(result => {
        message.textContent = result.message;
        message.classList.remove('hidden');
        message.style.color = 'green';
        form.reset();
      })
      .catch(error => {
        message.textContent = 'There was an unexpected error submitting your feedback.';
        message.classList.remove('hidden');
        message.style.color = 'red';
        console.error('Error!', error);
      });
  });
});
