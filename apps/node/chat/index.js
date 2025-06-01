import http from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();
app.use("/", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});
const server = http.createServer(app);
const io = new Server(server, {
  cors: true, //允许跨域
});

/**
 * 事件模型驱动
 * 组装返回渲染格式：
 * 1：[{name, room, id}, {name, room, id}] - 1 号房间有两个人
 * 2：[{name, room, id}] - 2 号房间有一个人
 * 3：[] - 3 号房间没有人
 */
const groupList = {};
io.on("connection", (socket) => {
  //加入房间
  socket.on("join", ({ name, room }) => {
    socket.join(room); // 创建一个房间
    if (groupList[room]) {
      groupList[room].push({ name, room, id: socket.id });
    } else {
      groupList[room] = [{ name, room, id: socket.id }];
    }
    socket.emit("message", { user: "管理员", text: `${name}进入了房间` });
    socket.emit("groupList", groupList);
    // 所有人都能看见消息（广播）；指定房间 broadcast.to(room).emit
    socket.broadcast.emit("groupList", groupList);
  });
  //发送消息
  socket.on("message", ({ text, room, user }) => {
    // 广播给房间其他人（但自己没收到，自己需要添加）
    socket.broadcast.to(room).emit("message", {
      text,
      user,
    });
  });
  //断开链接内置事件
  socket.on("disconnect", () => {
    Object.keys(groupList).forEach((key) => {
      let leval = groupList[key].find((item) => item.id === socket.id);
      if (leval) {
        socket.broadcast
          .to(leval.room)
          .emit("message", { user: "管理员", text: `${leval.name}离开了房间` });
      }
      groupList[key] = groupList[key].filter((item) => item.id !== socket.id);
    });
    socket.broadcast.emit("groupList", groupList);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
