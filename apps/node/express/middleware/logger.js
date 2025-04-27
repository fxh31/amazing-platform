import log4js from "log4js";
log4js.configure({
  appenders: {
    out: {
      type: "stdout", // 控制台输出
      layout: {
        type: "colored",
      },
    }, // 控制台输出
    file: {
      filename: "logs/server.log", // 日志文件路径
      type: "file",
    }, // 文件输出
  },
  categories: {
    default: {
      appenders: ["out", "file"], // 控制台和文件输出
      level: "debug", // 日志级别
    },
  },
});
const logger = log4js.getLogger("default"); // 获取默认日志记录器
// 每个请求都会经过中间件
// req：前端传递数据； res：返回给前端的数据
const LoggerMiddleware = (req, res, next) => {
  logger.debug(`[${req.method}] ${req.url}`); // 输出请求方法和请求路径
  next();
};

export default LoggerMiddleware;
