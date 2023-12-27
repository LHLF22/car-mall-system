/*
 * @Date: 2023-12-05 14:35:51
 * @LastEditTime: 2023-12-20 14:09:13
 * @FilePath: \car-mall-system\vite.config.ts
 * @Description:
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
//import { resolve } from "path";
import path from 'path'
import { settings } from "./src/config/index";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  //Vite 项目如何配置相对地址或绝对地址？
  // base: "./", // 配置相对地址或绝对地址，此处应为绝对地址，若将 Web 部署到 Nginx 所在的目录为 nginx-1.17.8/html/xxx ，则这个 base 的值就为 /xxx/
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src'),
    },
  },
  /* 主要用途是将我们的constant.scss中的scss常量加载到全局，这样我们可以在style标签中，随意使用这些scss常量 */
  css:{
    preprocessorOptions:{
      scss:{
        additionalData:'@import "@/assets/scss/constant.scss";'
      }
    }
  },
  server: {
    // 是否主动唤醒浏览器
    open: true,
    host: settings.host, //主机
    port: settings.port, //端口
    proxy: settings.proxyFlag
      ? {
          //项目v1的服务端接口地址，之后在api目录下return http.get(`/v1/api/getUserById?userId=${userId}`)，请求的实际上是http://localhost:8080/v1/api/getUserById?userId=10001
          "/v1/api": {
            target: "http://127.0.0.1:8091", // 后台接口
            changeOrigin: true, // 是否允许跨域
            //secure: false, // 如果是https接口，需要配置这个参数
            ws: true,
          },

          //项目v2的服务端接口地址
          "/v2/api": {
            target: "http://127.0.0.1:8092",
            changeOrigin: true,
            secure: false,
            ws: true,
          },

          //项目v3的服务端接口地址
          "/v3/api": {
            target: "http://127.0.0.1:8093",
            changeOrigin: true,
            secure: false,
            ws: true,
          },

          // // 默认服务端接口地址
          // '/': {
          //   target: 'http://127.0.0.1:8090/',
          //   changeOrigin: true,
          //   secure: false,
          //   ws: false
          // }
        }
      : {},
  },
});
