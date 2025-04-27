import express from "express";

const router = express.Router(); // 路由模块化

router.post("/login", (req, res) => {
  res.json({
    code: 200,
    msg: "登录成功",
  });
});
router.post("/register", (req, res) => {
  res.json({
    code: 200,
    msg: "注册成功",
  });
});

export default router;
