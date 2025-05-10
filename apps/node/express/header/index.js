import express from "express";

const app = express();

app.use((req, res, next) => {
  // 允许指定 ip 或网址访问
  res.setHeader("Access-Control-Allow-Origin", ["http://localhost:5500"]);
  // 允许所有资源访问（注：但是后端的 session 是没有办法传给前端的 cookie 中）
  // res.setHeader("Access-Control-Allow-Origin", "*");

  // 其他请求方式（注：Access-Control-Allow-Methods 默认只支持 get、post、head）
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, OPTIONS, PUT, DELETE, PATCH"
  );

  // 支持 application/json
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// 预检请求 OPTIONS，由浏览器发起
app.post("/info", (req, res) => {
  res.json({
    code: 200,
    type: "post",
  });
});

app.get("/info", (req, res) => {
  // 自定义响应头
  res.set("ferhannah", 234448883);
  // 抛出自定义响应头，这样前端才能获取到（补充：响应头有缓存，后续即使不设置再次刷新浏览器也能获取到；使用隐私模式就好）
  // res.setHeader("Access-Control-Expose-Headers", "ferhannah");

  res.json({
    code: 200,
    type: "get",
  });
});

// WebSocket 实时通讯，全双工通信（前后端实时发送消息给对方）
// SSE 单工通讯（前端向后端发送一次请求后，后端向前端实时推送消息）- 大屏项目
app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream"); // SSE

  setInterval(() => {
    res.write("event: test\n"); // 默认是 message，可自定义事件名（test）
    res.write("data:" + Date.now() + "\n\n"); // 发送数据
  }, 1000);
});

app.listen(3000, () => {
  console.log("server is running at http://localhost:3000");
});
