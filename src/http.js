const http = require('http');
const fs = require('fs').promises;

// Config variables
const HTTPConfig = {
    host: "localhost",
    port: 5016,
    path: __dirname + "\\..\\web\\index.html"
}

// Server listener
const listener = function (req, res) {
    fs.readFile(HTTPConfig.path).then(contents => {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(contents);
    }).catch(() => {
        res.writeHead(500);
        console.log(path);
        res.end("Server error");
    })
};

// Finally, create the server
const server = http.createServer(listener);
const StartHTTPServer = () => {
    server.listen(HTTPConfig.port, HTTPConfig.host, () => {
        console.log(`HTTP Server is running on http://${HTTPConfig.host}:${HTTPConfig.port}`);
    });
    
    return server
}

exports.HTTPConfig = HTTPConfig
exports.StartHTTPServer = StartHTTPServer