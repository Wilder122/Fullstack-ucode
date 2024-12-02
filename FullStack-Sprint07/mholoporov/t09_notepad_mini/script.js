document.addEventListener('DOMContentLoaded', function() {
    const noteForm = document.getElementById('noteForm');
    const noteList = document.getElementById('noteList');
    const noteDetailName = document.getElementById('noteDetailName');
    const noteDetail = document.getElementById('noteDetail');

    function fetchNotes() {
        fetch('/notes')
            .then(response => response.json())
            .then(data => {
                noteList.innerHTML = '';
                data.forEach(note => {
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="#" class="note-link" data-id="${note.id}">${note.date} > ${note.name}</a> <a href="#" class="delete-link" data-id="${note.id}">DELETE</a>`;
                    noteList.appendChild(li);
                });
            });
    }

    noteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const importance = document.getElementById('importance').value;
        const text = document.getElementById('text').value;
        
        fetch('/add-note', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, importance, text })
        }).then(() => {
            fetchNotes();
            noteForm.reset();
        });
    });

    noteList.addEventListener('click', function(event) {
        if (event.target.classList.contains('note-link')) {
            event.preventDefault();
            const id = event.target.getAttribute('data-id');
            
            fetch(`/note/${id}`)
                .then(response => response.json())
                .then(note => {
                    noteDetailName.textContent = note.name;
                    noteDetail.innerHTML = `
                        <p>date: ${note.date}</p>
                        <p>name: ${note.name}</p>
                        <p>importance: ${note.importance}</p>
                        <p>text: ${note.text}</p>
                    `;
                });
        } else if (event.target.classList.contains('delete-link')) {
            event.preventDefault();
            const id = event.target.getAttribute('data-id');
            
            fetch(`/note/${id}`, {
                method: 'DELETE'
            }).then(() => {
                fetchNotes();
            });
        }
    });

    fetchNotes();
});