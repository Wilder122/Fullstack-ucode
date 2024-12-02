const http = require('http');
const os = require('os');
const url = require('url');

// Get the script file name
const scriptName = process.argv[1];

// Get the arguments passed to the script
const scriptArgs = process.argv.slice(2);

// Get the server's IP address
const serverIPs = [];
const networkInterfaces = os.networkInterfaces();
for (const interfaceName of Object.keys(networkInterfaces)) {
    for (const net of networkInterfaces[interfaceName]) {
        if (net.family === 'IPv4' && !net.internal) {
            serverIPs.push(net.address);
        }
    }
}

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Filter out favicon requests
    if (req.url === '/favicon.ico') {
        res.writeHead(204, { 'Content-Type': 'image/x-icon' });
        res.end();
        return;
    }

    // Get the host name
    const hostname = req.headers.host;

    // Get the protocol name and version
    const protocol = req.httpVersion;

    // Get the query method
    const method = req.method;

    // Get the User-Agent information
    const userAgent = req.headers['user-agent'];

    // Get the client's IP address
    const clientIP = req.connection.remoteAddress;

    // Get the list of parameters passed by URL
    const parsedUrl = url.parse(req.url, true);
    const params = parsedUrl.query;

    // Output the information to the console
    console.log(`Name of executed script: ${scriptName}`);
    console.log(`Arguments passed to the script: ${scriptArgs.join(' ')}`);
    console.log(`IP address of the server: ${serverIPs.join(', ')}`);
    console.log(`Name of host that invokes the current script: ${hostname}`);
    console.log(`Name and version of the information protocol: HTTP/${protocol}`);
    console.log(`Query method: ${method}`);
    console.log(`User-Agent information: ${userAgent}`);
    console.log(`IP address of the client: ${clientIP}`);
    console.log(`List of parameters passed by URL:`, params);

    // Send a response
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Information has been logged to the console.');
});

// Start the server
const port = 3000;
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});




// 1. node index.js arg1 arg2