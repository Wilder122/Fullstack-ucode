document.addEventListener('DOMContentLoaded', () => {
    const createFileForm = document.getElementById('createFileForm');
    const fileListUl = document.getElementById('fileList');
    const currentFileSection = document.getElementById('currentFileSection');
    const currentFileName = document.getElementById('currentFileName');
    const currentFileContent = document.getElementById('currentFileContent');
    const deleteFileForm = document.getElementById('deleteFileForm');
    const deleteFileName = document.getElementById('deleteFileName');

    const fetchFiles = () => {
        fetch('/list-files')
            .then(response => response.json())
            .then(files => {
                fileListUl.innerHTML = '';
                files.forEach(file => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = "#";
                    a.textContent = file;
                    a.addEventListener('click', () => {
                        fetch(`/select-file?file=${file}`)
                            .then(response => response.json())
                            .then(data => {
                                currentFileSection.style.display = 'block';
                                currentFileName.textContent = data.name;
                                currentFileContent.textContent = data.content;
                                deleteFileName.value = data.name;
                            }).catch(error => console.error('Error fetching file:', error));
                    });
                    li.appendChild(a);
                    fileListUl.appendChild(li);
                });
            }).catch(error => console.error('Error fetching files:', error));
    };

    createFileForm.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(createFileForm);
        const data = new URLSearchParams();
        formData.forEach((value, key) => {
            data.append(key, value);
        });

        fetch('/create-file', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to create file');
            }
            return response.text();
        }).then(() => {
            createFileForm.reset();
            fetchFiles();
        }).catch(error => console.error('Error creating file:', error));
    });

    deleteFileForm.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(deleteFileForm);
        const data = new URLSearchParams();
        formData.forEach((value, key) => {
            data.append(key, value);
        });

        fetch('/delete-file', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete file');
            }
            return response.text();
        }).then(() => {
            currentFileSection.style.display = 'none';
            fetchFiles();
        }).catch(error => console.error('Error deleting file:', error));
    });

    fetchFiles();
});