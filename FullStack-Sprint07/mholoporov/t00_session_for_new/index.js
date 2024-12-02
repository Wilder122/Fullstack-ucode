document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('heroForm');
    const responseDiv = document.getElementById('response');

    fetch('/data')
        .then(response => response.json())
        .then(data => {
            if (data.hero) {
                displayHeroData(data.hero);
            } else {
                form.style.display = 'block';
            }
        });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        fetch('/apply', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            displayHeroData(data.hero);
            form.reset();
        })
        .catch(error => console.error('Error:', error));
    });

    function displayHeroData(hero) {
        form.style.display = 'none';
        responseDiv.innerHTML = `
            <p><strong>Real Name:</strong> ${hero.realName}</p>
            <p><strong>Superhero Name:</strong> ${hero.superheroName}</p>
            <p><strong>Age:</strong> ${hero.age}</p>
            <p><strong>About:</strong> ${hero.about}</p>
            <p><strong>Photo:</strong> <img src="${hero.photo}" alt="Photo" style="max-width: 200px;"></p>
            <p><strong>Powers:</strong> ${hero.powers.join(', ')}</p>
            <p><strong>Level of Control:</strong> ${hero.levelControl}</p>
            <p><strong>Publicity:</strong> ${hero.origin}</p>
            <button id="forgetBtn">Forget</button>
        `;
        document.getElementById('forgetBtn').addEventListener('click', handleForget);
    }

    function handleForget() {
        fetch('/forget', { method: 'POST' })
            .then(() => {
                responseDiv.innerHTML = '';
                form.style.display = 'block';
            })
            .catch(error => console.error('Error:', error));
    }
});