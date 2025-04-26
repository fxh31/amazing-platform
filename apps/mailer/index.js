import http from "node:http";
import fs from "node:fs";
import url from "node:url";

import nodemailer from "nodemailer";
import yaml from "js-yaml";

const mailInfo = yaml.load(fs.readFileSync("./mail.yaml", "utf8"));

// 初始化邮件服务
const transport = nodemailer.createTransport({
  service: "qq", // 服务商
  host: "smtp.qq.com", // SMTP 服务器（qq 邮箱开发文档查看）
  port: 465, // SMTP 端口（qq 邮箱开发文档查看）
  auth: {
    user: mailInfo.user, // 邮箱账号
    pass: mailInfo.pass, // 密码 | 授权码
  },
});

http
  .createServer(async (req, res) => {
    const { pathname } = url.parse(req.url, true);
    const { method } = req;
    if (method === "POST" && pathname === "/send/mail") {
      // 发送邮件
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        const { to, subject, text } = JSON.parse(data);
        transport.sendMail({
          to,
          from: mailInfo.user,
          subject,
          text,
        });
        res.end("ok");
      });
    }
  })
  .listen(3000, () => {
    console.log("listening on port 3000");
  });
