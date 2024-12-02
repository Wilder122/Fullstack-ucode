let currentState = 1;

function transformation() {
    const heroElement = document.getElementById('hero');
    const labElement = document.getElementById('lab');

    if (currentState === 1) {
        // State 1: Bruce Banner
        heroElement.textContent = 'Bruce Banner';
        heroElement.style.fontSize = '60px';
        heroElement.style.letterSpacing = '2px';
        labElement.style.backgroundColor = '#ffb300';
        currentState = 2;
    } else {
        // State 2: Hulk
        heroElement.textContent = 'Hulk';
        heroElement.style.fontSize = '130px';
        heroElement.style.letterSpacing = '6px';
        labElement.style.backgroundColor = '#70964b';
        currentState = 1;
    }
}