const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.get('/style.css', function(request, response) {
    response.sendFile(__dirname + '/style.css');
});

app.listen(PORT, () => {
    console.log(`Server start on http://localhost:${PORT}`);
});



// 1. - Install 'npm install express'
// 2. - Run 'node index.js'