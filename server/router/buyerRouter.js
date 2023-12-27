const buyerSql = require("../db/buyer-sql");
const express = require("express");
const buyerRouter = express.Router();
buyerRouter.get("/carType", async (req, res, next) => {
  const result = await buyerSql.getCarType();
  if (result.length > 0) {
    res.send({
      code: 0,
      data: result,
      msg: "获取数据成功",
    });
  } else {
    res.send({
      code: -1,
      msg: "出错了",
    });
  }
});
module.exports = buyerRouter;
