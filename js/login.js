// JavaScript code for login functionality

document.getElementById('loginButton').addEventListener('click', function () {
    // Simple login logic (replace with your authentication logic)
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'your_username' && password === 'your_password') {
        // Redirect to the home page (change the URL as needed)
        window.location.href = 'home_page.html';
    } else {
        alert('Invalid credentials. Please try again.');
    }
});
