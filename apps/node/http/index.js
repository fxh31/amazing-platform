const http = require("node:http");
const url = require("node:url");

http
  .createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true); // true：序列化参数
    if (req.method === "POST") {
      if (pathname === "/login") {
        let data = "";
        req.on("data", (chunk) => {
          data += chunk;
        });
        req.on("end", () => {
          res.setHeader("Content-Type", "application/json");
          res.statusCode = 200;
          res.end(data);
        });
      } else {
        res.statusCode = 404;
        res.end("404");
      }
    } else if (req.method === "GET") {
      if (pathname === "/get") {
        console.log(query);
        res.end("GET");
      } else {
        res.statusCode = 404;
        res.end("404");
      }
    }
  })
  .listen(98, () => {
    console.log("Server is running on port 98");
  }); // port < 65535
