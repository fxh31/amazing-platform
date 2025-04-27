import express from "express";

const router = express.Router(); // 路由模块化

router.post("/getall", (req, res) => {
  res.json({
    code: 200,
    msg: "成功",
    获取,
  });
});

export default router;
