const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const File = require('./File');
const FileList = require('./FileList');

const port = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname === '/' && req.method === 'GET') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (pathname === '/index.js' && req.method === 'GET') {
        fs.readFile('index.js', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.end(data);
            }
        });
    } else if (pathname === '/create-file' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const params = new URLSearchParams(body);
            const fileName = params.get('fileName');
            const fileContent = params.get('fileContent');
            if (fileName && fileContent) {
                const file = new File(fileName);
                file.write(fileContent);
                res.writeHead(302, { 'Location': '/' });
                res.end();
            } else {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('File name and content are required');
            }
        });
    } else if (pathname === '/list-files' && req.method === 'GET') {
        const fileList = new FileList();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(fileList.getList()));
    } else if (pathname === '/select-file' && req.method === 'GET') {
        const fileName = parsedUrl.query.file;
        if (fileName) {
            const file = new File(fileName);
            if (file.exists()) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ name: fileName, content: file.read() }));
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
            }
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('File name is required');
        }
    } else if (pathname === '/delete-file' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const params = new URLSearchParams(body);
            const fileName = params.get('fileName');
            if (fileName) {
                const file = new File(fileName);
                file.delete();
                res.writeHead(302, { 'Location': '/' });
                res.end();
            } else {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('File name is required');
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});



// 1. Run 'node server.js'
// 2. Run 'node test.js' and check the result