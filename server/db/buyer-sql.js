/*
 * @Date: 2023-12-13 15:40:01
 * @LastEditTime: 2024-03-11 16:19:54
 * @FilePath: \car-mall-system\server\db\buyer-sql.js
 * @Description:
 */
const { myPromise, carResFormat, buyerCarResFormat } = require("../utils.js");
const moment = require("moment");
const buyer = {
  /* 获取所有汽车分类和详细分类 */
  async getCarType() {
    const db = "select * from car_tag";
    const res = await myPromise(db);
    const list = await Promise.all(
      res.map(async (el) => {
        const dbEvery = "select * from car_type where tag= ?";
        let listSecond = await myPromise(dbEvery, [el.name]);
        listSecond = listSecond.map((elem) => ({
          name: elem.name,
          id: elem.id,
        }));
        return {
          type: { id: el.id, tag: el.name, icon: el.icon },
          list: listSecond,
        };
      })
    );
    return list;
  },
  /* 通过id获取汽车分类   1->{id:1,name:'车身分类',icon:'Odometer'}*/
  async getCarCategory(id) {
    const db = "select * from car_tag where id= ?";
    return await myPromise(db, [id]);
  },
  /* 通过id获取详细分类  1 -> {id:1,name:'轿车',tag:'车身分类'}*/
  async getCarConcret(id) {
    const db = "select * from car_type where id= ?";
    return await myPromise(db, [id]);
  },
  /* 通过name获取name下的分类，如：车身分类 ->轿车 SUV 跑车 奥迪 宝马 …… */
  async getCarConcretNameAll(name) {
    const db = "select * from car_type where tag= ?";
    return await myPromise(db, [name]);
  },

  async getCarSpecial(buyerId, data, serverAddress) {
    let db = "select * from car where ";
    let params = [];
    data.forEach((item, index) => {
      params.push(item.tag);
      if (index !== data.length - 1) {
        db += `${item.tag} = '${item.name}' and `;
      } else {
        db += `${item.tag} = '${item.name}' `;
      }
    });
    const res = await myPromise(db, [...params]);
    return await buyerCarResFormat(buyerId, res, serverAddress);
  },
  async getCarSpecialById(buyerId, id, serverAddress) {
    const db = "select * from car where id = ?";
    const res = await myPromise(db, [id]);
    return await buyerCarResFormat(buyerId, res, serverAddress);
  },
  async getStaticArea() {
    const db = "select * from dou_area";
    const allArea = await myPromise(db);
    const areaIds = allArea.map((el) => el.area_id); //独一的 [1,2,3]
    const uniqueParentIds = [...new Set(allArea.map((el) => el.parent_id))]; //[0,1,2]
    let area = [];
    const getAreaCircle = (
      el,
      areaIds,
      allArea,
      processedNodes = new Set()
    ) => {
      if (!processedNodes.has(el.area_id)) {
        //已处理过的节点，避免重复处理
        processedNodes.add(el.area_id);
        /* 2.无子有父  判断有无父：areaIds.includes(el.parent_id)  北京市有北京*/
        /* 3.有子无父 ：省份   判断有无子：uniqueParentIds.includes(el.area_id) 北京有北京市*/
        /* 有子无父 */
        if (
          uniqueParentIds.includes(el.area_id) &&
          !areaIds.includes(el.parent_id)
        ) {
          const father = { value: el.name, label: el.name };
          const child = allArea.filter((e) => e.parent_id === el.area_id);
          child.forEach((i) => {
            getAreaCircle(i, areaIds, allArea, processedNodes);
            processedNodes.add(i.area_id);
          });
          father.children = child.map((e) => {
            if (e.children) {
              return { value: e.name, label: e.name, children: e.children };
            } else {
              return { value: e.name, label: e.name };
            }
          });
          return father;
        } else if (
          uniqueParentIds.includes(el.area_id) &&
          areaIds.includes(el.parent_id)
        ) {
          /* 有父有子 */
          /* 给父亲增加儿子 */
          const fatherIndex = allArea.findIndex(
            (e) => e.area_id === el.parent_id
          );
          if (Array.isArray(allArea[fatherIndex].children)) {
            allArea[fatherIndex].children.push({
              value: el.name,
              label: el.name,
            });
          } else {
            allArea[fatherIndex].children = [].push({
              value: el.name,
              label: el.name,
            });
          }
          /* 给儿子增加孙子 */
          const child = allArea.filter((e) => e.parent_id === el.area_id);
          child.forEach((i) => {
            getAreaCircle(i, areaIds, allArea, processedNodes);
            processedNodes.add(i.area_id);
          });
          el.children = child.map((e) => {
            if (e.children) {
              return { value: e.name, label: e.name, children: e.children };
            } else {
              return { value: e.name, label: e.name };
            }
          });
        } else if (
          !uniqueParentIds.includes(el.area_id) &&
          areaIds.includes(el.parent_id)
        ) {
          /* 有父无子 */
          const fatherIndex = allArea.findIndex(
            (e) => e.area_id === el.parent_id
          );
          if (Array.isArray(allArea[fatherIndex].children)) {
            allArea[fatherIndex].children.push({
              value: el.name,
              label: el.name,
            });
          } else {
            allArea[fatherIndex].children = [].push({
              value: el.name,
              label: el.name,
            });
          }
        }
      } else {
        return;
      }
    };
    allArea.forEach((item) => {
      const tree = getAreaCircle(item, areaIds, allArea);
      if (tree) {
        area.push(tree);
      }
    });
    return area;
  },
  async shopcartCreate(buyerId, carId, count) {
    const db =
      "insert into buyer_shopcart (buyerId,carId,count) values (?,?,?)";
    return await myPromise(db, [buyerId, carId, count]);
  },
  async shopcartEdit(buyerId, carId, count) {
    if (parseInt(count) !== 0) {
      const db =
        "update buyer_shopcart set count = ? where  buyerId = ? and carId = ?";
      return await myPromise(db, [count, buyerId, carId]);
    } else {
      const db = "delete from buyer_shopcart where buyerId = ? and carId = ?";
      return await myPromise(db, [buyerId, carId]);
    }
  },
  async getShopCart(buyerId, serverAddress) {
    const carShopDb = "select * from buyer_shopcart where buyerId = ?";
    const carShopRes = await myPromise(carShopDb, buyerId);
    let carInfo = [];
    await Promise.all(
      carShopRes.map(async (res) => {
        const db = "select * from car where id = ?";
        const carRes = await myPromise(db, [res.carId]);
        const carResult = await buyerCarResFormat(
          buyerId,
          carRes,
          serverAddress
        );
        carInfo.push(...carResult);
      })
    );
    return carInfo;
  },
  async deleteShopCart(buyerId, deleteId) {
    const db = "delete from buyer_shopcart where buyerId = ? and carId in (?)";
    return await myPromise(db, [buyerId, deleteId]);
  },

  async getShippingAddress(buyerId) {
    const db = "select * from buyer_shipping_address where buyerId = ?";
    const res = await myPromise(db, [buyerId]);
    res.forEach((e) => {
      if (e.province) {
        e.province = JSON.parse(e.province);
      }
    });
    return res;
  },
  async editShippingAddress(id, name, phone, province, detailAddress, buyerId) {
    const db =
      "update buyer_shipping_address set name = ?,phone = ?,province= ?, detailAddress= ? where id = ? and buyerId = ?";
    return myPromise(db, [
      name,
      phone,
      JSON.stringify(province),
      detailAddress,
      id,
      parseInt(buyerId),
    ]);
  },
  async deleteShippingAddress(buyerId, deleteId) {
    const db =
      "delete from buyer_shipping_address where buyerId = ? and id = ?";
    return await myPromise(db, [buyerId, deleteId]);
  },
  async addShippingAddress(name, phone, province, detailAddress, buyerId) {
    const db =
      "insert into buyer_shipping_address (buyerId,name,phone,province,detailAddress) values (?,?,?,?,?)";
    return await myPromise(db, [
      buyerId,
      name,
      phone,
      JSON.stringify(province),
      detailAddress,
    ]);
  },

  async pay(data, buyerId) {
    const db =
      "insert into buyer_order (buyerId,shop,price,buyerShippingAddressId) values (?,?,?,?)";

    const res = await myPromise(db, [
      buyerId,
      JSON.stringify(data.shopItems),
      data.price,
      data.buyerShippingAddressId,
    ]);

    data.shopItems.forEach(async (el) => {
      const db =
        "insert into `order` (buyerOrderId,buyerId,carId,count,price,appointmentTime,buyerShippingAddressId) values (?,?,?,?,?,?,?)";
      await myPromise(db, [
        parseInt(res.insertId),
        parseInt(buyerId),
        parseInt(el.carId),
        parseInt(el.count),
        parseInt(el.price),
        el.appointmentTime,
        parseInt(data.buyerShippingAddressId),
      ]);
    });

    return res;
  },

  async getBuyerOrder(buyerId, serverAddress) {
    const orderDb = "select * from buyer_order where buyerId = ?";
    const orderRes = await myPromise(orderDb, [buyerId]);
    order = await Promise.all(
      orderRes.map(async (el) => {
        const shop = await Promise.all(
          JSON.parse(el.shop).map(async (e) => {
            const carDb = "select * from car where id = ?";
            const carRes = await myPromise(carDb, [e.carId]);
            const shopInfo = carResFormat(carRes, serverAddress)[0];
            const storeDb = "select * from store where sellerId = ?";
            const storeInfo = await myPromise(storeDb, [shopInfo.sellerId]);
            const isConfirmReciept =
              "select * from `order` where carId = ? and buyerOrderId = ?";
            const confirmRecieptRes = await myPromise(isConfirmReciept, [
              e.carId,
              el.id,
            ]);
            return {
              ...confirmRecieptRes[0],
              ...shopInfo,
              count: e.count,
              storeInfo: storeInfo[0],
              appointmentTime: e.appointmentTime,
            };
          })
        );
        const addressDb = "select * from buyer_shipping_address where id = ?";
        const addressRes = await myPromise(addressDb, [
          el.buyerShippingAddressId,
        ]);
        const shippingAddress = addressRes[0];
        return {
          id: el.id,
          shop,
          price: el.price,
          shippingAddress,
          createdAt: moment(el.createdAt).format("YYYY-MM-DD HH:mm:ss"),
        };
      })
    );
    return order;
  },
  async confirmReciept(carId, buyerOrderId) {
    const db =
      "update `order` set confirmReciept = ? where carId = ? and buyerOrderId = ?";
    return await myPromise(db, [1, carId, buyerOrderId]);
  },
  async afterSale(data, buyerId) {
    const { carId, buyerOrderId, sellerId, desc, afterSaleType } = data;
    const orderIdDb =
      "select id from `order` where carId = ? and buyerOrderId = ? and buyerId = ?";
    const orderId = await myPromise(orderIdDb, [carId, buyerOrderId, buyerId]);
    const db =
      "insert into after_sale (carId,orderId,sellerId,buyerId,`desc`,afterSaleType) values (?,?,?,?,?,?)";
    const res = await myPromise(db, [
      carId,
      orderId[0].id,
      sellerId,
      buyerId,
      desc,
      parseInt(afterSaleType),
    ]);
    const orderChangeDb = "update `order` set afterSaleType = ? where id = ?";
    await myPromise(orderChangeDb, [parseInt(afterSaleType), orderId[0].id]);
    return res;
  },
  async getAfterSale(buyerId, serverAddress) {
    const afterSaleDb = "select * from after_sale where buyerId = ?";
    const afterSaleRes = await myPromise(afterSaleDb, [buyerId]);
    return Promise.all(
      afterSaleRes.map(async (el) => {
        const carInfoDb = "select * from car where id = ?";
        const carInfoRes = await myPromise(carInfoDb, [el.carId]);
        const carInfo = carResFormat(carInfoRes, serverAddress);
        const storeInfoDb = "select * from store where sellerId = ?";
        const storeInfoRes = await myPromise(storeInfoDb, [el.sellerId]);
        const orderInfoDb = "select * from `order` where id = ? ";
        const orderInfoRes = await myPromise(orderInfoDb, [el.orderId]);
        return {
          id: el.id,
          carInfo: carInfo[0],
          storeInfo: storeInfoRes[0],
          orderInfo: orderInfoRes[0],
          afterSaleType: el.afterSaleType,
          desc: el.desc,
          isProcessed: el.isProcessed,
          createdAt: moment(el.createdAt).format("YYYY-MM-DD HH:mm:ss"),
          sellerDesc: el.sellerDesc,
        };
      })
    );
  },
  async cancelApplication(afterSaleId, orderId) {
    const orderChangeDb = "update `order` set afterSaleType = ? where id = ?";
    const afterSaleChangeDb =
      "update after_sale set afterSaleType = ? where id = ?";
    return Promise.all([
      await myPromise(orderChangeDb, [0, orderId]),
      await myPromise(afterSaleChangeDb, [0, afterSaleId]),
    ]);
  },
  async addFavor(buyerId, data) {
    const { carId, sellerId } = data;
    const db = "insert into favor_list (buyerId,carId,sellerId) values (?,?,?)";
    return await myPromise(db, [parseInt(buyerId), carId, sellerId]);
  },
  async deleteFavor(buyerId, data) {
    const { carId, sellerId } = data;
    const db =
      "delete from  favor_list where buyerId = ? and carId = ? and sellerId = ?";
    return await myPromise(db, [parseInt(buyerId), carId, sellerId]);
  },
  async getFavor(buyerId, serverAddress) {
    const db = "select * from favor_list where buyerId = ? ";
    const dbRes = await myPromise(db, [parseInt(buyerId)]);

    if (dbRes.length > 0) {
      return await Promise.all(
        dbRes.map(async (el) => {
          const db = "select * from car where id = ?";
          const carInfoRes = await myPromise(db, [el.carId]);
          const carInfo =await buyerCarResFormat(buyerId,carInfoRes, serverAddress);
          return {
            ...el,
            carInfo: carInfo[0],
          };
        })
      );
    } else {
      return [];
    }
  },
  async getAllCar(buyerId, serverAddress) {
    const db='select * from car'
    const dbRes = await myPromise(db);
    return await buyerCarResFormat(buyerId,dbRes,serverAddress);
  }
};
exports = module.exports = buyer;
