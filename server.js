const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer(function(req, res) {

    let fileName = req.url;

    if (fileName === "/") {
        fileName = "/index.html";
    }

    fs.readFile("." + fileName, function(error, data) {
        if (error) {
            res.writeHead(404, {
                "Content-Type": "text/plain"
            });

            res.end("File not found.");
            return;
        }

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(data);
    });
});

server.listen(3000, function() {
    console.log("Server running at http://localhost:3000");
});