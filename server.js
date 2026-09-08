const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const contentTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".mp4": "video/mp4"
};

const server = http.createServer(function(req, res) {

    let fileName = req.url;

    if (fileName === "/") {
        fileName = "/index.html";
    }

    fs.readFile(path.join(__dirname, fileName), function(error, data) {

        if (error) {
            res.writeHead(404, {
                "Content-Type": "text/plain"
            });

            res.end("File not found.");
            return;
        }

        const extension = path.extname(fileName);
        const contentType = contentTypes[extension] || "application/octet-stream";

        res.writeHead(200, {
            "Content-Type": contentType
        });

        res.end(data);
    });
});

server.listen(3000, function() {
    console.log("Server running at http://localhost:3000");
});