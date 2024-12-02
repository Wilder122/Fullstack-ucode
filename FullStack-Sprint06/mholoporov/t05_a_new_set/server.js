const http = require('http');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

const port = 3000;

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/') {
            fs.readFile('index.html', (err, data) => {
                if (err) {
                    console.error('Error reading index.html:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        } else if (req.url === '/style.css') {
            fs.readFile('style.css', (err, data) => {
                if (err) {
                    console.error('Error reading style.css:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.end(data);
                }
            });
        } else if (req.url === '/script.js') {
            fs.readFile('script.js', (err, data) => {
                if (err) {
                    console.error('Error reading script.js:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.end(data);
                }
            });
        } else if (req.url === '/favicon.ico') {
            fs.readFile('favicon.ico', (err, data) => {
                if (err) {
                    res.writeHead(204, { 'Content-Type': 'image/x-icon' });
                    res.end();
                } else {
                    res.writeHead(200, { 'Content-Type': 'image/x-icon' });
                    res.end(data);
                }
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    } else if (req.method === 'POST' && req.url === '/apply') {
        const form = new formidable.IncomingForm();
        form.keepExtensions = true;

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error('Error parsing the form:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }

            console.log('Fields:', fields);
            console.log('Files:', files);

            const photo = files.photo && Array.isArray(files.photo) ? files.photo[0] : files.photo;
            if (!photo || !photo.filepath) {
                console.error('No valid file uploaded');
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid file upload');
                return;
            }

            // Read the file into memory
            fs.readFile(photo.filepath, (err, data) => {
                if (err) {
                    console.error('Error reading the uploaded file:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    return;
                }

                const photoName = photo.originalFilename;
                const photoSize = photo.size;
                const photoType = photo.mimetype;

                const response = `
                    <div id="post">
                        <h2>Application Received</h2>
                        <p><strong>Name:</strong> ${fields.name}</p>
                        <p><strong>E-mail:</strong> ${fields.email}</p>
                        <p><strong>Age:</strong> ${fields.age}</p>
                        <p><strong>About:</strong> ${fields.description}</p>
                        <p><strong>Photo:</strong> ${photoName}</p>
                    </div>
                `;

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(response);

                // Clean up the temporary file
                fs.unlink(photo.filepath, (err) => {
                    if (err) {
                        console.error('Error deleting the temporary file:', err);
                    }
                });
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


//  1. - Install 'npm install formidable'
// 2. - Run 'node server.js'