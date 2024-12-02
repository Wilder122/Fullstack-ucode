const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/count', (req, res) => {
    const now = Date.now();
    const expireTime = 60000;

    let pageLoads = [];
    if (req.cookies.page_loads) {
        try {
            pageLoads = JSON.parse(req.cookies.page_loads);
            pageLoads = pageLoads.filter(timestamp => now - timestamp < expireTime);
        } catch (e) {
            console.error('Error parsing cookies:', e);
        }
    }
    pageLoads.push(now);
    res.cookie('page_loads', JSON.stringify(pageLoads), { maxAge: expireTime });

    res.json({ count: pageLoads.length });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});



// 1. Install 'npm install'
// 2. Run node 'index.js'