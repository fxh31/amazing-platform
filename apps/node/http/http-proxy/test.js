const http = require("node:http");
const url = require("node:url");

http
  .createServer((req, res) => {
    const { pathname } = url.parse(req.url);
    if (pathname === "/api") {
      res.end("proxy success");
    }
  })
  .listen(3000, () => {
    console.log("Server is running on port 3000");
  });
