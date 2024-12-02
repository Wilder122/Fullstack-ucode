const images = [
    'assets/images/Spider_Man.png',
    'assets/images/Doctor_Strange_Marvel.png',
    'assets/images/Venom.png'
];

let currentIndex = 0;
const sliderImage = document.getElementById('slider-image');
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');

function showImage(index) {
    sliderImage.src = images[index];
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

let sliderInterval = setInterval(nextImage, 3000);

leftButton.addEventListener('click', () => {
    clearInterval(sliderInterval);
    prevImage();
    sliderInterval = setInterval(nextImage, 3000);
});

rightButton.addEventListener('click', () => {
    clearInterval(sliderInterval);
    nextImage();
    sliderInterval = setInterval(nextImage, 3000);
});

showImage(currentIndex);