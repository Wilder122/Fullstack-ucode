document.getElementById('generate-button').addEventListener('click', function() {
    const imageUrl = document.getElementById('image-url').value;
    const imageContainer = document.getElementById('image-container');

    imageContainer.innerHTML = '';

    for (let i = 0; i < 4; i++) {
        const img = document.createElement('img');
        img.src = imageUrl;
        imageContainer.appendChild(img);
    }
});