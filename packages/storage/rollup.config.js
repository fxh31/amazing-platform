import ts from "rollup-plugin-typescript2";
import path from "path";
import { fileURLToPath } from "url";
import clear from "rollup-plugin-clear";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  input: "./src/index.ts",
  output: {
    file: path.resolve(dirname, "./lib/index.js"),
  },
  plugins: [
    clear({
      targets: ["dist", "lib"],
    }), // 清除上次打包产物
    ts({
      useTsconfigDeclarationDir: true, // 明确使用 tsconfig.json 里的 declarationDir
    }),
  ],
};
