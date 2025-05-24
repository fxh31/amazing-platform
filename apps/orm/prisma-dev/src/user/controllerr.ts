import type { Request, Response } from "express";

import {
  controller,
  httpGet as GetMapping,
  httpPost as PostMapping,
} from "inversify-express-utils";
import { UserService } from "./services"; // 充当类型
import { inject } from "inversify";

/**
 * 控制层：调用接口方法
 */

@controller("/user")
export class User {
  // 提供依赖注入
  constructor(@inject(UserService) private readonly UserService: UserService) {}
  @GetMapping("/index")
  public async getIndex(req: Request, res: Response) {
    console.log(req.query);
    let result = await this.UserService.getList();
    res.send(result);
  }

  @PostMapping("/create")
  public async createUser(req: Request, res: Response) {
    let result = await this.UserService.createUser(req.body);
    res.send(result);
  }
}
