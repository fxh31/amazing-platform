import { injectable, inject } from "inversify";
import passport from "passport";
import jsonwebtoken from "jsonwebtoken";
import { ExtractJwt, Strategy } from "passport-jwt";

@injectable()
export class JWT {
  private secret = "ferhannah%$@!888";
  // jwt 配置
  private jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: this.secret,
  };

  constructor() {
    this.strategy(); // 初始化策略
  }

  public strategy() {
    const str = new Strategy(this.jwtOptions, (payload, done) => {
      done(null, payload);
    });
    passport.use(str); // 使用 passport-jwt 策略
  }

  public static middleware() {
    // 需要经过 jwt 验证
    return passport.authenticate("jwt", { session: false });
  }

  /**
   * 生成 token
   */
  public createToken(data: object) {
    return jsonwebtoken.sign(data, this.secret, { expiresIn: "7d" });
  }
  /**
   * 关联 express
   */
  public init() {
    return passport.initialize();
  }
}
