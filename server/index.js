/*
 * @Date: 2023-12-13 09:45:20
 * @LastEditTime: 2023-12-13 11:34:26
 * @FilePath: \car-mall-system\server\index.js
 * @Description:
 */
const express = require("express");
const app = express();
/* 导入 cors 中间件 */
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())
/*  配置解析表单数据的中间件：1. 配置解析 application/x-www-form-urlencoded 和解析json 格式的表单数据中间件 */
app.use(express.urlencoded({extended:false}))
app.use(express.json())
/* 设置静态目录 */
app.use('/apidoc',express.static('apidoc'))
/* 设置端口 */
const port = 3000;

// 导入并注册用户路由模块
const userRouter = require("./router/userRouter");
//挂载路由并设置路由前缀api
app.use("/user",userRouter);
app.listen(port, function () {
  console.log(`${port}端口服务器已启动~🚀`);
});
