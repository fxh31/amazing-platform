const http = require("node:http");
const url = require("node:url");
const fs = require("node:fs");
const { createProxyMiddleware } = require("http-proxy-middleware");

const html = fs.readFileSync("./index.html");
const config = require("./xm.config.js");

// 80 -> 3000（80 代理到 3000）
http
  .createServer((req, res) => {
    const { pathname } = url.parse(req.url);
    const proxyList = Object.keys(config.serve.proxy);

    if (proxyList.includes(pathname)) {
      const proxy = createProxyMiddleware(config.serve.proxy[pathname]);
      proxy(req, res);
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  })
  .listen(80);
