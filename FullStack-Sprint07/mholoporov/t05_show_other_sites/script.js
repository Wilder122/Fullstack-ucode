document.querySelector('form[name="urlForm"]').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const url = document.getElementById('url').value;
    document.getElementById('urlText').textContent = `url: ${url}`;
    try {
        const response = await fetch('/fetch-html', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const data = await response.json();
        document.getElementById('htmlText').innerHTML = `<pre>${escapeHtml(data.bodyContent)}</pre>`;
    } catch (error) {
        document.getElementById('htmlText').innerHTML = `Error loading content: ${error.message}`;
    }
});

document.getElementById('back').addEventListener('click', () => {
    document.getElementById('url').value = '';
    document.getElementById('urlText').textContent = 'Type an URL...';
    document.getElementById('htmlText').textContent = 'Content will be displayed here...';
});

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}