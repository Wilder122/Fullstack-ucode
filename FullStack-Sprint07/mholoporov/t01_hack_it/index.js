document.addEventListener('DOMContentLoaded', function() {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            const contentDiv = document.getElementById('content');
            if (data.saved) {
                contentDiv.innerHTML = `
                    <p>Password saved at session.<br>Hash is ${data.hash}<br>Try to guess:</p>
                    <form action="/check" method="POST">
                        <input type="text" name="password" placeholder="Password to session">
                        <button type="submit">Check password</button>
                    </form>
                    <form action="/clear" method="POST">
                        <button type="submit">Clear</button>
                    </form>
                `;
            } else {
                contentDiv.innerHTML = `
                    <p>Password not saved at session.<br>Password for saving to session</p>
                    <form action="/save" method="POST">
                    <input type="text" name="password" placeholder="Password to session">
                        <button type="submit">Save</button>
                    </form>
                `;
            }
        });
});