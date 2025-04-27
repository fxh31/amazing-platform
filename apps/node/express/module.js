import express from "express";
import User from "./src/user.js";
import List from "./src/list.js";
import LoggerMiddleware from "./middleware/logger.js";

const app = express();

app.use(express.json());
app.use(LoggerMiddleware);
// 路由模块化 - 添加前缀路由，有效防止重名
app.use("/user", User);
app.use("/list", List);

app.listen(3000, () => {
  console.log("server is running at http://localhost:3000");
});
