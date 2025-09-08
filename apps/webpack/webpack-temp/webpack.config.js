const { Configuration } = require("webpack");
const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const CssExtractPlugin = require("mini-css-extract-plugin");

/**
 * @type {Configuration}
 */
const config = {
  mode: "development", // 模式
  entry: "./src/main.ts", // 入口文件
  output: {
    path: path.resolve(__dirname, "dist"), // 生成目录
    filename: "index.[chunkhash].js", // 打包后的文件
    clean: true, // 每次打包前清空 dist 目录
  },
  stats: "errors-only", // 只在终端显示错误信息（其他信息太多干扰）
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // 以 index.html 为模板生成 dist/index.html
    }),
    new VueLoaderPlugin(), // vue-loader 需要配合 VueLoaderPlugin 使用
    new CssExtractPlugin(), // 用于提取 css 到单独文件
  ], // webpack 插件都是构造函数，需要 new
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            appendTsSuffixTo: [/\.vue$/], // 让 ts-loader 也能处理 .vue 文件中的 ts 代码
          },
        },
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.css$/,
        use: [CssExtractPlugin.loader, "css-loader"], // 从后往前执行（style-loader 动态插入一个 style 标签，性能不好）；CssExtractPlugin.loader 提取到单独文件，使用 link 标签引入提升性能
      },
      {
        test: /\.less$/,
        use: [CssExtractPlugin.loader, "css-loader", "less-loader"], // 从后往前执行
      },
    ],
  },
  // 代码拆分
  optimization: {
    // 拆分第三方库
    splitChunks: {
      cacheGroups: {
        moment: {
          name: "moment",
          chunks: "all", // 对同步、异步代码都进行分割
          test: /[\\/]node_modules[\\/]moment[\\/]/, // 只打包 moment 相关的代码
        },
        // 针对所有的公共模块
        common: {
          name: "common",
          chunks: "all", // 所有代码分割
          minSize: 2, // 引用次数大于2 个就拆分出来
        },
      },
    },
  },
};

module.exports = config;
