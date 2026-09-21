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

const projects = [
    {
        id: 1,
        name: "Test Project",
        description: "Test 123",
        image: null,
        devlogs: []
    }
];

const server = http.createServer(function(req, res) {
    
    if (req.url === "/api/projects" && req.method === "GET") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(projects));
        return;
    }
    if (req.url === "/api/login" && req.method === "POST") {
        let body = "";

        req.on("data", function(chunk) {
            body += chunk;
        });

        req.on("end", function() {
            const login = JSON.parse(body);

            if (
                    login.username === process.env.ADMIN_USERNAME &&
                    login.password === process.env.ADMIN_PASSWORD
                ) {
                res.writeHead(200, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    success: true
                }));
            } else {
                res.writeHead(401, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    success: false
                }));
            }
        });

        return;
    }
    if (req.url === "/api/projects" && req.method === "POST") {
        let body = "";

        req.on("data", function(chunk) {
            body += chunk;
        });

        req.on("end", function() {
            const project = JSON.parse(body);

            projects.push(project);

            res.writeHead(201, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify(project));
        });

        return;
    }

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
