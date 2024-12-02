document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('charsetForm');
    const inputString = document.getElementById('inputString');
    const charsets = document.getElementById('charsets');
    const resultsDiv = document.getElementById('results');
    const convertBtn = document.getElementById('convertBtn');
    const clearBtn = document.getElementById('clearBtn');

    convertBtn.addEventListener('click', () => {
        const selectedCharsets = Array.from(charsets.selectedOptions).map(option => option.value);
        const data = {
            inputString: inputString.value,
            charsets: selectedCharsets
        };

        fetch('/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            resultsDiv.innerHTML = '';
            for (const charset in data) {
                const p = document.createElement('p');
                p.innerHTML = `<strong>${charset.toUpperCase()}:</strong> <textarea rows="2" cols="40" readonly>${data[charset]}</textarea>`;
                resultsDiv.appendChild(p);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    clearBtn.addEventListener('click', () => {
        resultsDiv.innerHTML = '';
    });
});