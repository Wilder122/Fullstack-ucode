document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('uploadForm');
    uploadForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(uploadForm);
        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            displayData(data);
        });
    });

    function displayData(data) {
        const headerRow = document.getElementById('headerRow');
        const dataRows = document.getElementById('dataRows');
        const columnSelect = document.getElementById('column');
        
        headerRow.innerHTML = '';
        dataRows.innerHTML = '';
        columnSelect.innerHTML = '';
        
        if (data.length > 0) {
            const headers = Object.keys(data[0]);
            
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
                
                const option = document.createElement('option');
                option.value = header;
                option.textContent = header;
                columnSelect.appendChild(option);
            });

            data.forEach(row => {
                const tr = document.createElement('tr');
                headers.forEach(header => {
                    const td = document.createElement('td');
                    td.textContent = row[header];
                    tr.appendChild(td);
                });
                dataRows.appendChild(tr);
            });
        }
    }

    document.getElementById('filter').addEventListener('click', function() {
        const column = document.getElementById('column').value;
        const value = document.getElementById('value').value.toLowerCase();
        
        const rows = document.getElementById('dataRows').getElementsByTagName('tr');
        
        Array.from(rows).forEach(row => {
            const cells = row.getElementsByTagName('td');
            let match = false;

            for (let cell of cells) {
                if (cell.cellIndex === document.getElementById('column').selectedIndex && cell.textContent.toLowerCase() === value) {
                    match = true;
                    break;
                }
            }

            row.style.display = match ? '' : 'none';
        });
    });
});