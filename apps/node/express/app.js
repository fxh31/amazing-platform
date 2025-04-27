import express from "express";

const app = express();

// 静态参数：req.query
app.get("/get", (req, res) => {
  console.log(req.query);
  res.send("get");
});
// 动态参数：req.params
app.get("/get/:id", (req, res) => {
  console.log(req.params);
  res.send(`动态参数- ${req.params.id}`);
});

app.use(express.json()); // 支持 post 解析 json（中间件，如果没有则会undefined）
// 静态参数：req.body + express.json()
app.post("/post", (req, res) => {
  console.log(req.body);
  res.send("post");
});

app.listen(3000, () => {
  console.log("server is running at http://localhost:3000");
});
