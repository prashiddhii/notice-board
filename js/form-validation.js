document.getElementById('contact-form').addEventListener('submit', function(event) {
    const email = document.getElementById('email').value;
    if (!validateEmail(email)) {
        event.preventDefault();
        alert('Please enter a valid email address.');
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}