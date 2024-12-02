document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/count');
        const data = await response.json();
        document.getElementById('count-message').innerText = `This page was loaded ${data.count} time(s) in last minute`;
    } catch (error) {
        document.getElementById('count-message').innerText = 'Error loading content';
    }
});