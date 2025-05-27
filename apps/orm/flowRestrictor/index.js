import express from "express";
import Redis from "ioredis";
import fs from "node:fs";

const lua = fs.readFileSync("./index.lua", "utf8");

const redis = new Redis({});
const app = express();

// 限流阀
const KEY = "lottery";
const TIME = 30; // 三十秒之内的操作
const LIMIT = 5; // 每分钟允许的请求次数（操作了 5 次）

app.use("/*paramName", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/lottery", (req, res) => {
  redis.eval(lua, 1, KEY, TIME, LIMIT, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result === 1) {
      res.send("抽奖成功！");
    } else {
      res.send("请稍后重试！");
    }
  });
});

app.listen(3000, () => {
  console.log("listen 3000");
});
