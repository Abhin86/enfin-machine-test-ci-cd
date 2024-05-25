// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

// MySQL connection setup
const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 2207,
  user     : 'root',   // replace 'yourUsername' with your MySQL username
  password : 'root@123#',   // replace 'yourPassword' with your MySQL password
  database : 'enfin_tech_db'    // replace 'yourDatabase' with your database name
});

// Connect to MySQL
connection.connect(err => {
  if (err) {
    return console.error('error connecting: ' + err.stack);
  }
  console.log('connected as id ' + connection.threadId);
});

//
//
// Define the port to run the server on
const PORT = 3000;

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Check if the request is for the root URL
    if (req.url === '/') {
        // Read the HTML file
        fs.readFile(path.join(__dirname, '/public/index.html'), (err, data) => {
            if (err) {
                // Handle any file reading errors
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                // Send the HTML file content
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else {
        // Handle 404 - Not Found
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
