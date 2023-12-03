
// Set the href attribute of the link
document.getElementById('websiteLink').href = '#';

// Update the dashboard content
document.getElementById('dashboard').innerHTML = '<h2>Dashboard Content Goes Here</h2>';
document.getElementById('websiteLink').addEventListener('click', function () {
    // Redirect to the home page (change the URL as needed)
    window.location.href = 'user_page.html';
});