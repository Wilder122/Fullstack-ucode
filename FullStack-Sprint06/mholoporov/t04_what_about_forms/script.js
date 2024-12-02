function submitAnswer() {
    const form = document.getElementById('quiz-form');
    const formData = new FormData(form);
    const params = new URLSearchParams(formData).toString();

    fetch('/check-answer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
    })
    .then(response => response.text())
    .then(result => {
        document.getElementById('result').textContent = result;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}