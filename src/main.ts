/*
 * @Date: 2023-12-05 14:35:51
 * @LastEditTime: 2023-12-08 16:48:27
 * @FilePath: \car-mall-system\src\main.ts
 * @Description:
 * 1.数据持久化
 * 2.全局变量 $api等 --->这个可能不需要了，直接用namespace
 * 3.配置router的导入文件
 * 4.element ui的导入和el-icon的导入
 * 5.想想layout文件夹干啥的怎么搞 --------->
 * 6.server后端文件 ----------->
 * 7.hooks文件，loading怎么设置 --------->看看怎么应用，请求时开启，请求完成时关闭。试试不要用蒙版，而用加载进度条，progress
 * 8.登录时的白名单：/login
 * 9.pinia结合怎么做全局守卫 ------------->查gpt
 * 10.别名@无法解决 (好像有生效，但是我的vscode会爆红)
 * 11.看请求配置是否生效 ----------------->这个重新搞一下，结合ts的，可以看一下以前王元红的
 * 12.之后携带token记得做上 ------------>
 * 13.TailwindCss 然后less为辅
 *
 */

import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import "normalize.css"; // 引入 normalize.css
import "@/assets/less/common.less";
import * as ElementPlusIcons from "@element-plus/icons-vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/theme-chalk/dark/css-vars.css";
import store from "./store/index";
import router from "./router/index";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIcons)) {
  app.component(key, component);
}

// 引入HTTP请求工具并配置为全局方法
/* import {user} from '@/api'//直接在api中有
app.config.globalProperties.$http = {
  user,
} */
import userApi from "./api/user";
app.config.globalProperties.$userApi = userApi;
app.use(ElementPlus).use(store).use(router).mount("#app");

// size 用于设置表单组件的默认尺寸，zIndex 用于设置弹出组件的层级，zIndex 的默认值为 2000。
// app.use(ElementPlus, { size: 'small', zIndex: 3000 })
