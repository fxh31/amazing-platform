// 全局类型声明文件，避免 ts 报错
// 需配置 tsconfig.json 中的 "include": ["src", "global.d.ts"]，否则 ts 无法识别该文件

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
