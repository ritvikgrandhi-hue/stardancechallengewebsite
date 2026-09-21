const form = document.getElementById('contact-form');

form.addEventListener('submit', function(event) {

    event.preventDefault();

    const myEmail = "ritvikgrandhi@gmail.com"

    const visitorName = document.getElementById('name').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('message').value;

    const emailBody = `Hi, my name is ${visitorName}.\n\nMessage:\n${message}`;

    window.location.href = `mailto:${myEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
});