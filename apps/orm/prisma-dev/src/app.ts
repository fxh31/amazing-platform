import express from "express";
// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();
const app = express();
const port = 3000;
app.use(express.json()); // 支持 post

// 查询
app.get("/", async (req, res) => {
  const data = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  res.send(data);
});

// 单条查询
app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const data = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.send(data);
});

// 新增
app.post("/create", async (req, res) => {
  const { name, email } = req.body;
  const data = await prisma.user.create({
    data: {
      name,
      email,
      posts: {
        create: [
          {
            title: "hello world",
            content: "hello world",
          },
          {
            title: "hello world2",
            content: "hello world2",
          },
        ],
      },
    },
  });
  res.send(data);
});

// 编辑
app.post("/update", async (req, res) => {
  const { name, email, id } = req.body;
  const data = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      email,
    },
  });
  res.send(data);
});

// 删除
app.delete("/delete", async (req, res) => {
  const { id } = req.body;
  await prisma.post.deleteMany({
    where: {
      authorId: Number(id),
    },
  }); // 级联删除，先删外键关联
  const data = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  res.send(data);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
