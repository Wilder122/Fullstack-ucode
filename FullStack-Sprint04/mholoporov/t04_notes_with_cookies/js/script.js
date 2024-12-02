let textArea = document.getElementById("inputText");
let archiveDiv = document.querySelector(".note-archive");

function addNoteToArchive(note) {
    const noteElement = document.createElement('p');
    noteElement.textContent = note;
    archiveDiv.appendChild(noteElement);
}

function displayCookies() {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    let hasNotes = false;

    cookies.forEach(cookie => {
        if (cookie.startsWith("note")) {
            hasNotes = true;
            const note = decodeURIComponent(cookie.split('=')[1]);
            addNoteToArchive(`--> ${note}`);
        }
    });

    if (!hasNotes) {
        addNoteToArchive('[Empty]');
    }
}

function saveToCookies() {
    const textValue = textArea.value.trim();
    if (textValue === '') {
        alert('It\'s empty. Try to input something in the text area.');
        return;
    }
    const expiration = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
    const newNoteKey = `note${Date.now()}`;
    document.cookie = `${newNoteKey}=${encodeURIComponent(textValue)};expires=${expiration};path=/`;

    addNoteToArchive(`--> ${textValue}`);
    textArea.value = '';
}

function eraseCookies() {
    if (confirm("Are you sure?")) {
        document.querySelectorAll('.note-archive p').forEach(p => p.remove());
        const cookies = document.cookie.split(';');
        cookies.forEach(cookie => {
            const cookieName = cookie.split('=')[0].trim();
            if (cookieName.startsWith("note")) {
                document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
            }
        });
        addNoteToArchive('[Empty]');
    }
}

document.addEventListener('DOMContentLoaded', displayCookies);

