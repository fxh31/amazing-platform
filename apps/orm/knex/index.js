import mysql2 from "mysql2/promise";
import fs from "node:fs";
import jsyaml from "js-yaml";
import express from "express";

const yaml = fs.readFileSync("./db.config.yaml", "utf8");
const config = jsyaml.load(yaml);

const sql = await mysql2.createConnection({
  ...config.db,
});

const app = express();
app.use(express.json()); // 支持 post

// 查询接口
app.get("/", async (req, res) => {
  const [data] = await sql.query("SELECT * FROM `user`");
  res.send(data);
});
// 单个查询
app.get("/user/:id", async (req, res) => {
  const [data] = await sql.query("SELECT * FROM `user` WHERE id = ?", [
    req.params.id,
  ]);
  res.send(data);
});
// 新增接口
app.post("/create", async (req, res) => {
  const { name, age } = req.body;
  await sql.query("INSERT INTO `user` (name, age) VALUES (?, ?)", [name, age]);
  res.send({ ok: 1 });
});
// 编辑接口
app.post("/update", async (req, res) => {
  const { name, age, id } = req.body;
  await sql.query(`update user set name = ?, age = ? where id = ?`, [
    name,
    age,
    id,
  ]);
  res.send({ ok: 1 });
});
// 删除接口
app.post("/delete", async (req, res) => {
  const { id } = req.body;
  await sql.query("DELETE FROM `user` WHERE id = ?", [id]);
  res.send({ ok: 1 });
});

const port = 3000;
app.listen(port, () => {});
