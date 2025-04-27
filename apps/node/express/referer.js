import express from "express";

const app = express();
const whiteList = ["localhost"];

const preventHotLingking = (req, res, next) => {
  const referer = req.get("referer"); // 直接打开获取不到，需要发起一个请求
  if (referer) {
    const { hostname } = new URL(referer);
    if (!whiteList.includes(hostname)) {
      return res.status(403).send("禁止访问");
    }
  }
  next();
};

app.use(preventHotLingking);

// 初始化静态资源
app.use("/assets", express.static("static"));

app.listen(3000, () => {
  console.log("server started");
});
