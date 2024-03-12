/*
 * @Date: 2023-12-13 15:58:18
 * @LastEditTime: 2024-03-11 14:42:23
 * @FilePath: \car-mall-system\server\utils.js
 * @Description:
 */
const connection = require("./db/connect.js");
const moment = require("moment");
exports.myPromise = (query, params = []) => {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};
exports.returnCode = () => {
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  return randomNum;
};
exports.priceFormat = (price) => {
  const priceNow = parseInt(price) / 10000;
  if (priceNow < 8) {
    return "小于8万";
  } else if (priceNow < 10) {
    return "8-10万";
  } else if (priceNow < 15) {
    return "10-15万";
  } else if (priceNow < 20) {
    return "15-20万";
  } else if (priceNow < 30) {
    return "20-30万";
  } else if (priceNow < 50) {
    return "30-50万";
  } else {
    return "50万以上";
  }
};
/* 获取car数据时，处理img的图片的地址和时间格式化，再返回给前端 */
exports.carResFormat = (res, serverAddress) => {
  if (res.length > 0) {
    res.forEach((el) => {
      let createdAt = new Date(el.createdAt);
      let updatedAt = new Date(el.updatedAt);
      el.createdAt = moment(createdAt).format("YYYY-MM-DD HH:mm:ss");
      el.updatedAt = moment(updatedAt).format("YYYY-MM-DD HH:mm:ss");
      if (!el.img) return;
      const imgInfo = el.img.split(",");
      el.images = [];
      imgInfo.forEach((e) => {
        const imgData = e.split(";");
        el.images.push({
          name: e.split(";")[0],
          url: serverAddress + e.split(";")[1],
        });
      });
      delete el.img;
    });
  } else {
    res = [];
  }
  return res;
};
/* 用户身份下，获取的汽车列表数据中有该汽车的加购信息：该汽车的加购数量 */
exports.buyerCarResFormat = async (buyerId, res, serverAddress) => {
  if (res.length > 0) {
    await Promise.all(
      res.map(async (el) => {
        let createdAt = new Date(el.createdAt);
        let updatedAt = new Date(el.updatedAt);
        el.createdAt = moment(createdAt).format("YYYY-MM-DD HH:mm:ss");
        el.updatedAt = moment(updatedAt).format("YYYY-MM-DD HH:mm:ss");
        let shopCart = await this.myPromise(
          "select count from buyer_shopcart where buyerId = ? and carId = ?",
          [buyerId, el.id]
        );
        el.shopCart = shopCart.length > 0 ? shopCart[0].count : 0;
        let isFavor = await this.myPromise(
          "select * from favor_list where  buyerId = ? and carId = ?",
          [buyerId, el.id]
        );
        el.isFavor = isFavor.length > 0 ? 1 : 0;
        // let shippingAddress=await this.myPromise('select * from buyer_shipping_address where  buyerId = ?',[buyerId])
        // el.shippingAddress=shippingAddress.length > 0 ? shopCart : [];
        if (!el.img) return;
        const imgInfo = el.img.split(",");
        el.images = [];
        imgInfo.forEach((e) => {
          const imgData = e.split(";");
          el.images.push({
            name: e.split(";")[0],
            url: serverAddress + e.split(";")[1],
          });
        });
        delete el.img;
      })
    );
  } else {
    res = [];
  }
  return res;
};
