/*
 * @Date: 2023-12-13 11:07:34
 * @LastEditTime: 2023-12-14 11:57:10
 * @FilePath: \car-mall-system\server\db\connect.js
 * @Description:
 */
const mysql = require("mysql");
// 创建数据库连接对象
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "car-mall-system",
});
// 向外共享 db 数据库连接对象
module.exports = connection;
