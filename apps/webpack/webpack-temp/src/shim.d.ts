// 解决 ts 不认识 .vue 文件后缀的问题（声明垫片）
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
