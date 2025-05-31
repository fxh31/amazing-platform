// 实现 http 协议
import net from "net";

const html = `<h1>TCP</h1>`;
// 组装报文头
const responseHeaders = [
  "HTTP/1.1 200 OK",
  "Content-Type: text/html; charset=utf-8",
  "Content-Length: " + Buffer.byteLength(html), // html.length
  "Connection: close",
  "\r\n",
  html,
];

const http = net.createServer((socket) => {
  socket.on("data", (e) => {
    // 根据返回的信息去组装一个报文头
    // console.log(e.toString());
    if (/GET/.test(e.toString())) {
      socket.write(responseHeaders.join("\r\n"));
      socket.end();
    }
  });
});

http.listen(80, () => {
  console.log("HTTP server is listening on port 80");
});
