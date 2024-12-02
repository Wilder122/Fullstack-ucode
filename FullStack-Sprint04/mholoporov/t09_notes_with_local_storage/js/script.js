const textInput = document.getElementById('text-input');
const addButton = document.getElementById('add-button');
const clearButton = document.getElementById('clear-button');
const archiveText = document.getElementById('archive-text');

function getNotesFromStorage() {
  try {
    const storedNotes = localStorage.getItem('notes');
    return storedNotes ? JSON.parse(storedNotes) : [];
  } catch (error) {
    console.error('Error parsing notes from storage:', error);
    return [];
  }
}

function setNotesInStorage(value) {
  try {
    localStorage.setItem('notes', JSON.stringify(value));
  } catch (error) {
    console.error('Error storing notes in storage:', error);
  }
}

function updateArchiveText() {
  const notes = getNotesFromStorage();
  archiveText.innerHTML = notes.length ? notes.map(note => `${note.text} - ${note.timestamp}`).join('<br>') : '[Empty]';
}

// Call updateArchiveText() when the page loads
document.addEventListener('DOMContentLoaded', () => {
  updateArchiveText();
});

addButton.addEventListener('click', () => {
  const text = textInput.value.trim();
  if (text) {
    const notes = getNotesFromStorage();
    notes.push({ text: text, timestamp: new Date().toLocaleString() });
    setNotesInStorage(notes);
    updateArchiveText();
    textInput.value = '';
  } else {
    alert('It\'s empty. Try to input something in "Text input".');
  }
});

clearButton.addEventListener('click', () => {
  if (confirm('Are you sure?')) {
    setNotesInStorage([]);
    updateArchiveText([]);
  }
});