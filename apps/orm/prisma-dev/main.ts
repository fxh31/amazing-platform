import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from "inversify";

import { User } from "./src/user/controllerr";
import { UserService } from "./src/user/services";

import express from "express";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaDB } from "./src/db";

import { JWT } from "./src/jwt";

const container = new Container();

/**
 * user 模块注入到容器中
 */
container.bind(User).to(User);
container.bind(UserService).to(UserService);

/**
 * jwt 模块注入到容器中
 */
container.bind(JWT).to(JWT);

/**
 * 封装 PrismaClient（注入工厂）
 */
container.bind<PrismaClient>("PrismaClient").toFactory(() => {
  return () => {
    return new PrismaClient();
  };
});
container.bind(PrismaDB).to(PrismaDB);
/** */

const server = new InversifyExpressServer(container);
// 编写中间件，支持 json 格式
server.setConfig((app) => {
  app.use(express.json());
  app.use(container.get(JWT).init()); // 初始化 jwt
});
const app = server.build();

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

declare global {
  // 扩充 Express 的 Request 对象，避免类型报错（Express 已预留）
  namespace Express {
    interface User {
      id: number;
      name: string;
      email: string;
    }
  }
}
