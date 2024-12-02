'use strict';

let loadedCount = 0;
const images = [
    './assets/images/1.jpg',
    './assets/images/2.jpg',
    './assets/images/3.png',
    './assets/images/4.jpg',
    './assets/images/5.png',
    './assets/images/6.jpeg',
    './assets/images/7.jpg',
    './assets/images/8.jpg',
    './assets/images/9.jpg',
    './assets/images/10.jpg'
];

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

async function lazyLoadImages() {
    const imageContainer = document.getElementById('imageContainer');

    for (const src of images) {
        const img = document.createElement('img');
        img.classList.add('image');
        img.src = './assets/images/temp.gif';
        img.setAttribute('data-src', src);
        imageContainer.appendChild(img);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    const src = image.getAttribute('data-src');
                    loadImage(src)
                        .then(() => {
                            image.src = src;
                            loadedCount++;
                            document.getElementById('loadedCount').textContent = loadedCount;
                            if (loadedCount === images.length) {
                                const messageContainer = document.querySelector('.message-container');
                                messageContainer.style.backgroundColor = 'green';
                                setTimeout(() => {
                                    messageContainer.style.display = 'none';
                                }, 3000);
                            }
                        })
                        .catch((error) => {
                            console.error('Error loading image:', error);
                        })
                        .finally(() => {
                            observer.unobserve(image);
                        });
                }
            });
        });

        observer.observe(img);
    }
}

document.addEventListener('DOMContentLoaded', lazyLoadImages);