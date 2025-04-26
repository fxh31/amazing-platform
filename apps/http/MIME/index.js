import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import mime from "mime"; // 帮助我们自动分析文件类型的模块（根据 url 后缀分析）

const server = http.createServer((req, res) => {
  const { method, url } = req;
  // 静态资源请求
  if (method === "GET" && url.startsWith("/static")) {
    const staticPath = path.join(process.cwd(), url);

    fs.readFile(staticPath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("not found");
      } else {
        const type = mime.getType(staticPath); // 获取文件类型
        console.log(
          "一般在第一次请求时能看见，走缓存后，开新的标签页不会触发该打印"
        ); // Size 也变成 disk cache
        res.writeHead(200, {
          "Content-Type": type,
          "cache-control": "public, max-age=3600",
        }); //mime 类型
        res.end(data);
      }
    });
  }

  // 动态资源请求
  if ((method === "GET" || method === "POST") && url.startsWith("/api")) {
    // 接口逻辑
  }
});

server.listen(80, () => {
  console.log("Server running at http://127.0.0.1");
});
