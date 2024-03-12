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
    const nameResult = await buyerSql.getCarConcretNameAll(result[0].name);
    if (nameResult.length > 0) {
      res.send({
        code: 0,
        data: nameResult,
        msg: "获取数据成功",
      });
    } else {
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
/* 通过侧栏选中的标签返回符合的所有汽车 */
buyerRouter.post("/carSpecial/:buyerId", async (req, res, next) => {
  const serverAddress = `${req.protocol}://${req.get("host")}`;
  const result = await buyerSql.getCarSpecial(
    req.params.buyerId,
    req.body,
    serverAddress
  );

  // console.log(result,'here')
  if (result.length > 0) {
    res.send({
      code: 0,
      data: result,
      msg: "获取数据成功",
    });
  } else {
    res.send({
      code: -1,
      data: result,
      msg: "获取数据失败",
    });
  }
});
/* 通过汽车id获取某一辆汽车的信息 */
buyerRouter.get("/carSpecial/:id/:buyerId", async (req, res, next) => {
  const serverAddress = `${req.protocol}://${req.get("host")}`;
  const result = await buyerSql.getCarSpecialById(
    req.params.buyerId,
    req.params.id,
    serverAddress
  );
  // console.log(result)
  if (result.length > 0) {
    res.send({
      code: 0,
      data: result[0],
      msg: "获取数据成功",
    });
  } else {
    res.send({
      code: -1,
      msg: "获取数据失败",
    });
  }
});
/* 获取静态全国地址分类数据 */
buyerRouter.get("/getArea", async (req, res, next) => {
  const result = await buyerSql.getStaticArea();
  if (result.length > 0) {
    res.send({
      code: 0,
      data: result,
      msg: "获取地址数据成功",
    });
  } else {
    res.send({
      code: -1,
      msg: "获取地址数据失败",
    });
  }
});
/* 将商品加入购物车 - 创建购物车数据*/
buyerRouter.post("/shopcart/create/:buyerId", async (req, res, next) => {
  const { carId, count } = req.body;
  const result = await buyerSql.shopcartCreate(
    req.params.buyerId,
    carId,
    count
  );
  if (result.affectedRows === 1) {
    res.send({
      code: 0,
      msg: "加入购物车失败，请稍后重试",
    });
  } else {
    res.send({
      code: -1,
      msg: "加入购物车失败",
    });
  }
});
/* 修改购物车数据 - 修改商品数量*/
buyerRouter.post("/shopcart/edit/:buyerId", async (req, res, next) => {
  const { carId, count } = req.body;
  const result = await buyerSql.shopcartEdit(req.params.buyerId, carId, count);
  if (result.affectedRows === 1) {
    res.send({
      code: 0,
      msg: "修改购物车成功",
    });
  } else {
    res.send({
      code: -1,
      msg: "更新购物车失败，请稍后重试",
    });
  }
});
/* 获取用户的购物车数据 */
buyerRouter.get("/shopcart/info/:buyerId", async (req, res, next) => {
  const serverAddress = `${req.protocol}://${req.get("host")}`;
  const result = await buyerSql.getShopCart(req.params.buyerId, serverAddress);
  if (result.length > 0) {
    res.send({
      code: 0,
      data: result,
      msg: "获取购物车数据成功",
    });
  } else {
    res.send({
      code: -1,
      data: [],
      msg: "购物车数据为空",
    });
  }
});
/* 删除购物车 */
buyerRouter.post("/shopcart/delete/:buyerId", async (req, res, next) => {
  const deleteId = req.body;
  const result = await buyerSql.deleteShopCart(req.params.buyerId, deleteId);
  if (result.affectedRows > 0) {
    res.send({
      code: 0,
      msg: "删除成功",
    });
  } else {
    res.send({
      code: 0,
      msg: "删除失败",
    });
  }
});

/* 获取收获地址 */
buyerRouter.get("/shippingAddress/:buyerId", async (req, res, next) => {
  const result = await buyerSql.getShippingAddress(req.params.buyerId);
  if (result.length > 0) {
    res.send({
      code: 0,
      data: result,
      msg: "获取收货地址成功",
    });
  } else {
    res.send({
      code: -1,
      data: [],
      msg: "获取收货地址失败",
    });
  }
});
/*  修改收获地址 */
buyerRouter.post("/shippingAddress/edit/:buyerId", async (req, res, next) => {
  const { id, name, phone, province, detailAddress } = req.body;
  const result = await buyerSql.editShippingAddress(
    id,
    name,
    phone,
    province,
    detailAddress,
    req.params.buyerId
  );
  if (result.affectedRows === 1) {
    res.send({
      code: 0,
      msg: "修改收货地址成功",
    });
  } else {
    res.send({
      code: -1,
      msg: "修改收货地址失败",
    });
  }
});
/* 删除收货地址 */
buyerRouter.delete(
  "/shippingAddress/delete/:deleteId/:buyerId",
  async (req, res, next) => {
    const result = await buyerSql.deleteShippingAddress(
      req.params.buyerId,
      req.params.deleteId
    );
    if (result.affectedRows === 1) {
      res.send({
        code: 0,
        msg: "删除收货地址成功",
      });
    } else {
      res.send({
        code: -1,
        msg: "删除收获地址失败",
      });
    }
  }
);
/* 新增收获地址 */
buyerRouter.post("/shippingAddress/add/:buyerId", async (req, res, next) => {
  const { name, phone, province, detailAddress } = req.body;
  const result = await buyerSql.addShippingAddress(
    name,
    phone,
    province,
    detailAddress,
    req.params.buyerId
  );
  if (result.affectedRows === 1) {
    res.send({
      code: 0,
      msg: "新增收货地址成功",
    });
  } else {
    res.send({
      code: -1,
      msg: "新增收货地址失败",
    });
  }
});

/* 下单 */
buyerRouter.post("/shopcart/pay/:buyerId", async (req, res, next) => {
  const result = await buyerSql.pay(req.body, req.params.buyerId);
  if (result.affectedRows === 1) {
    res.send({
      code: 0,
      msg: "下单成功",
    });
  } else {
    res.send({
      code: -1,
      msg: "下单失败",
    });
  }
});

/* 获取用户的所有订单 */
buyerRouter.get("/order/:buyerId", async (req, res, next) => {
  const serverAddress = `${req.protocol}://${req.get("host")}`;
  const result = await buyerSql.getBuyerOrder(
    req.params.buyerId,
    serverAddress
  );
  if (result.length > 0) {
    res.send({
      code: 0,
      data: result,
      msg: "获取订单成功",
    });
  } else {
    res.send({
      code: -1,
      data: [],
      msg: "获取订单失败",
    });
  }
});
/* 买家确认收货 */
buyerRouter.get(
  "/order/confirm/:carId/:buyerOrderId",
  async (req, res, next) => {
    const result = await buyerSql.confirmReciept(
      req.params.carId,
      req.params.buyerOrderId
    );
    if (result.affectedRows === 1) {
      res.send({
        code: 0,
        msg: "确认收货成功",
      });
    } else {
      res.send({
        code: -1,
        msg: "确认收货失败",
      });
    }
  }
);
/* 申请退款与售后 */
buyerRouter.post("/order/afterSale/:buyerId", async (req, res, next) => {
  const result=await buyerSql.afterSale(req.body,req.params.buyerId)
  if(result.affectedRows===1){
    res.send({
      code: 0,
      msg: "操作成功",
    });
  }else{
    res.send({
      code: -1,
      msg: "操作失败",
    });
  }
})
/* 获取退款与售后 */
buyerRouter.get("/order/afterSale/:buyerId", async (req, res, next) => {
  const serverAddress = `${req.protocol}://${req.get("host")}`;
  const result=await buyerSql.getAfterSale(req.params.buyerId,serverAddress)
  if(result.length>0){
    res.send({
      code: 0,
      data:result,
      msg: "获取退款与售后成功",
    });
  }else{
    res.send({
      code: -1,
      data:[],
      msg: "获取退款与售后失败",
    });
  }
})
/* 撤销退款与售后的申请 */
buyerRouter.get("/order/afterSale/cancel/:afterSaleId/:orderId", async (req, res, next) => {
  const result=await buyerSql.cancelApplication(req.params.afterSaleId,req.params.orderId)
  if(result.map(e=>e.affectedRows===1).length===2){
    res.send({
      code: 0,
      msg: "撤销申请成功",
    });
  }else{
    res.send({
      code: -1,
      msg: "撤销申请失败",
    });
  }
})

/* 收藏商品 */
buyerRouter.post("/favor/add/:buyerId", async (req, res, next) => {
const result=await buyerSql.addFavor(req.params.buyerId,req.body)
if(result.affectedRows===1){
  res.send({
    code: 0,
    msg: "收藏成功",
  });
}else{
  res.send({
    code: -1,
    msg: "收藏失败",
  });
}
})
/* 取消收藏 */
buyerRouter.post("/favor/delete/:buyerId", async (req, res, next) => {
  const result=await buyerSql.deleteFavor(req.params.buyerId,req.body)
  if(result.affectedRows===1){
    res.send({
      code: 0,
      msg: "取消收藏成功",
    });
  }else{
    res.send({
      code: -1,
      msg: "取消收藏失败",
    });
  }
})
/* 获取收藏列表 */
buyerRouter.get("/favor/:buyerId", async (req, res, next) => {
  const serverAddress = `${req.protocol}://${req.get("host")}`;
  const result=await buyerSql.getFavor(req.params.buyerId,serverAddress)
  if(result.length>0){
    res.send({
      code: 0,
      data:result,
      msg: "获取收藏列表成功",
    });
  }else{
    res.send({
      code: -1,
      data:[],
      msg: "获取收藏列表失败",
    });
  }
})
/* 获取所有汽车 */
buyerRouter.get("/allCar/:buyerId", async (req, res, next) => {
  const serverAddress = `${req.protocol}://${req.get("host")}`;
  const result=await buyerSql.getAllCar(req.params.buyerId,serverAddress)
  if(result.length>0){
    res.send({
      code: 0,
      data:result,
      msg: "获取数据成功",
    });
  }else{
    res.send({
      code: -1,
      data:[],
      msg: "获取数据失败",
    });
  }
})
module.exports = buyerRouter;
