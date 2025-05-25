import { injectable, inject } from "inversify";
import { PrismaDB } from "../db";

import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { UserDto } from "./user.dto";

import { JWT } from "../jwt";

@injectable()
export class UserService {
  constructor(
    @inject(PrismaDB) private readonly PrismaDB: PrismaDB,
    @inject(JWT) private readonly JWT: JWT
  ) {}

  public async getList() {
    return await this.PrismaDB.prisma.user.findMany();
  }

  public async createUser(user: UserDto) {
    let userDto = plainToClass(UserDto, user); // 将值合并到类里
    const error = await validate(userDto); // 验证这个类

    if (error.length > 0) {
      return error;
    } else {
      const result = await this.PrismaDB.prisma.user.create({
        data: user,
      });
      return {
        ...result,
        token: this.JWT.createToken(result), // 生成 token
      };
    }
  }
}
