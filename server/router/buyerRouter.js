const buyerSql = require("../db/buyer-sql");
const express = require("express");
const buyerRouter = express.Router();
/* 获取侧栏汽车分类 */
/**
 * @api {get} /buyer/carType 获取侧栏汽车分类
 * @apiName 获取侧栏汽车分类
 * @apiGroup 买家接口
 * @apiSuccessExample Success-Response:
 *     {
 *       code: 0,
 *       data:{
 *            type:{
 *                  id:1,
 *                  tag:"车身分类"，
 *                  icon:"Menu"
 *                  },
 *            list:[
 *                  {
 *                  id:1,
 *                  name:"轿车"
 *                  }
 *            ]
 *       }
 *        msg:"注册成功"
 *     }
 */
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
/* 通过id获取汽车分类 */
buyerRouter.post("/carCategorySpecial", async (req, res, next) => {
  // console.log(req.body);
  const result = await buyerSql.getCarCategory(req.body.id);
  if (result.length > 0) {
    res.send({
      code: 0,
      data: result[0],
      msg: "获取数据成功",
    });
  } else {
    res.send({
      code: -1,
      msg: "出错了",
    });
  }
});
/* 通过id获取详细分类  */
buyerRouter.post("/carConcretSpecial", async (req, res, next) => {
  const result = await buyerSql.getCarConcret(req.body.id);
  if (result.length > 0) {
    res.send({
      code: 0,
      data: result[0],
      msg: "获取数据成功",
    });
  } else {
    res.send({
      code: -1,
      msg: "出错了",
    });
  }
});
/* 通过name获取该标签下的所有分类 ，如：车身分类 ->轿车 SUV 跑车 奥迪 宝马 …… */
buyerRouter.post("/carCategoryNameAll", async (req, res, next) => {
  const result = await buyerSql.getCarCategory(req.body.id);
  if (result.length > 0) {
    const nameResult=await buyerSql.getCarConcretNameAll(result[0].name)
    if(nameResult.length>0){
      res.send({
        code: 0,
        data: nameResult,
        msg: "获取数据成功",
      });
    }else{
      res.send({
        code: -1,
        msg: "出错了",
      });
    }
  } else {
    res.send({
      code: -1,
      msg: "出错了",
    });
  }
});

buyerRouter.post('/carSpecial',async (req, res, next) => {
  const result=await buyerSql.getCarSpecial()
  if(result.length>0){
    res.send({
      code:0,
      data:result,
      msg:'获取数据成功'
    })
  }else{
    res.send({
      code:-1,
      msg:'获取数据失败'
    })
  }
})
module.exports = buyerRouter;
