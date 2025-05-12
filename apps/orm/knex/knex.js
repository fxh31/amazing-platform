import fs from "node:fs";
import jsyaml from "js-yaml";
import express from "express";
import knex from "knex";

const yaml = fs.readFileSync("./db.config.yaml", "utf8");
const config = jsyaml.load(yaml);

const db = knex({
  client: "mysql2",
  connection: config.db,
});

// knex 动态创建表结构
// 防止重复创建报错
db.schema
  .createTableIfNotExists("list", (table) => {
    table.increments("id").primary(); // 自增，主键
    table.integer("age");
    table.string("name");
    table.timestamp(true, true); // 创建时间，更新时间
  })
  .then(() => {
    console.log("创建成功！");
  });

// 事务
db.transaction(async (trx) => {
  try {
    await trx("list").insert({ name: "事务测试", age: 18 });
    await trx("list").insert({ name: "事务测试2", age: 18 });
    await trx.commit(); // 提交事务
  } catch (err) {
    await trx.rollback(); // 回滚事务
    console.log(err);
  }
})
  .then(() => {
    console.log("事务成功！");
  })
  .catch(() => {
    console.log("事务失败！");
  });

const app = express();
app.use(express.json()); // 支持 post

// 查询接口
app.get("/", async (req, res) => {
  const data = await db("list").select().orderBy("id", "desc"); // 排序（倒序）
  const count = await db("list").count("* as total");
  // 支持手动编写 sql
  db.raw("select * from user").then((data) => {});
  // 外连接（左）
  const table = await db("user")
    .select()
    .leftJoin("table", "user.id", "table.user_id");

  res.json({
    data,
    table,
    total: count[0].total,
    sql: db("list").select().toSQL().sql, // 调试 sql 语句，反向编译
  });
});
// 单个查询
app.get("/user/:id", async (req, res) => {
  const data = await db("list").select().where({ id: req.params.id });
  res.send(data);
});
// 新增接口
app.post("/create", async (req, res) => {
  const { name, age } = req.body;
  await db("list").insert({ name, age });
  res.send({ ok: 1 });
});
// 编辑接口
app.post("/update", async (req, res) => {
  const { name, age, id } = req.body;
  await db("list").update({ name, age }).where({ id });
  res.send({ ok: 1 });
});
// 删除接口
app.post("/delete", async (req, res) => {
  const { id } = req.body;
  await db("list").delete().where({ id });
  res.send({ ok: 1 });
});

const port = 3000;
app.listen(port, () => {});
