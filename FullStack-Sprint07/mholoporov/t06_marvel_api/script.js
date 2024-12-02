document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/characters');
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('Error loading content:', error);
    }
});

function displayData(data) {
    document.getElementById('code').innerText = data.code;
    document.getElementById('status').innerText = data.status;
    document.getElementById('copyright').innerText = data.copyright;
    document.getElementById('attrText').innerText = data.attributionText;
    document.getElementById('attrHTML').innerText = data.attributionHTML;
    document.getElementById('etag').innerText = data.etag;

    document.getElementById('offset').innerText = data.data.offset;
    document.getElementById('limit').innerText = data.data.limit;
    document.getElementById('total').innerText = data.data.total;
    document.getElementById('count').innerText = data.data.count;

    const charactersList = document.getElementById('characters');
    data.data.results.forEach(character => {
        const li = document.createElement('li');
        li.innerText = character.name;
        charactersList.appendChild(li);
    });
}