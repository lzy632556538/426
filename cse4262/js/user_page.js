// JavaScript code for button functionality

// Update the dashboard content
document.getElementById('dashboard').innerHTML = '<h2>Dashboard Content Goes Here</h2>';

// Add event listeners to the buttons
document.getElementById('uploadButton').addEventListener('click', function () {
    document.getElementById('dashboard').innerHTML = '<h2>Uploaded Soundtrack Content Goes Here</h2>';
});

document.getElementById('buyButton').addEventListener('click', function () {
    document.getElementById('dashboard').innerHTML = '<h2>Bought Soundtrack Content Goes Here</h2>';
});

document.getElementById('backButton').addEventListener('click', function () {
    // Redirect to the home page (change the URL as needed)
    window.location.href = 'home_page.html';
});