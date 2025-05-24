/**
 * dto 层：用于验证传入数据库表是否正确
 */
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Transform } from "class-transformer"; // 用于转换数据类型

export class UserDto {
  @IsNotEmpty({ message: "名字必填" })
  @Transform((user) => user.value.trim())
  name: string;

  @IsNotEmpty({ message: "邮箱必填" })
  @IsEmail({}, { message: "邮箱格式不正确" })
  email: string;
}
