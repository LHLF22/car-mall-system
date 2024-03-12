/*
 * @Date: 2023-12-13 15:40:01
 * @LastEditTime: 2024-03-11 10:52:53
 * @FilePath: \car-mall-system\server\db\seller-sql.js
 * @Description:
 */
const moment = require("moment");
const { myPromise, priceFormat, carResFormat } = require("../utils.js");
const seller = {
  async setCarImg(id, img, sellerId) {
    if (id === "-1") {
      const db = "insert into car (img,sellerId) values (?,?)";
      return await myPromise(db, [img, sellerId]);
    } else {
      const db = "update car set img = ? where id = ? and  sellerId = ?";
      return await myPromise(db, [img, id, sellerId]);
    }
  },
  async getCarDetail(serverAddress, sellerId) {
    const db = "select * from car where  sellerId = ?";
    const res = await myPromise(db, [sellerId]);
    return carResFormat(res, serverAddress);
  },
  async getStaticCarDisposition() {
    // const brandDb = "select name from brand";
    const brandDb = "select name from car_type where tag = '品牌和制造商' ";
    // const carTypeDb = "select name from carType";
    const carTypeDb = "select name from car_type where tag = '车身类型' ";
    const seatsDb = "select name from seats";
    const energyTypeDb = "select name from energyType";
    const transmissionTypeDb = "select name from transmissionType";
    const productionModeDb = "select name from productionMode";
    const intakeFormDb = "select name from intakeForm";

    const promises = [
      myPromise(brandDb),
      myPromise(carTypeDb),
      myPromise(seatsDb),
      myPromise(energyTypeDb),
      myPromise(transmissionTypeDb),
      myPromise(productionModeDb),
      myPromise(intakeFormDb),
    ];

    return await Promise.all(promises);
  },
  async updateCarProduct(
    id,
    name,
    price,
    quantity,
    status,
    brand,
    carType,
    seats,
    energyType,
    displacement,
    transmissionType,
    productionMode,
    intakeForm
  ) {
    const priceRange = priceFormat(price);
    const db =
      "update car set name = ?,price = ?,priceRange=?,quantity = ?,status = ?,brand = ?,carType = ?,seats = ?,energyType = ?, displacement = ?,transmissionType = ?,productionMode = ?, intakeForm = ? where id = ?";
    return await myPromise(db, [
      name,
      price,
      priceRange,
      quantity,
      status,
      brand,
      carType,
      seats,
      energyType,
      displacement,
      transmissionType,
      productionMode,
      intakeForm,
      id,
    ]);
  },
  async deleteCarProduct(id) {
    const db = "delete from car where id = ?";
    return await myPromise(db, [id]);
  },
  async getCarAllSeats(sellerId) {
    const db = "select distinct seats from car where sellerId = ?";
    return await myPromise(db, [sellerId]);
  },
  async getCarAllBrand(sellerId) {
    const db = "select distinct brand from car where sellerId = ?";
    return await myPromise(db, [sellerId]);
  },
  async getCarAllCarType(sellerId) {
    const db = "select distinct carType from car where sellerId = ?";
    return await myPromise(db, [sellerId]);
  },
  async getCarAllEnergyType(sellerId) {
    const db = "select distinct energyType from car where sellerId = ?";
    return await myPromise(db, [sellerId]);
  },
  async getCarAllDisplacement(sellerId) {
    const db = "select distinct displacement from car where sellerId = ?";
    return await myPromise(db, [sellerId]);
  },
  async getCarAllTransmissionType(sellerId) {
    const db = "select distinct transmissionType from car where sellerId = ?";
    return await myPromise(db, [sellerId]);
  },
  async getCarAllProductionMode(sellerId) {
    const db = "select distinct productionMode from car where sellerId = ?";
    return await myPromise(db, [sellerId]);
  },
  async getCarAllIntakeForm(sellerId) {
    const db = "select distinct intakeForm from car where sellerId = ?";
    return await myPromise(db, [sellerId]);
  },

  async getStoreInfo(id) {
    const db = "select * from store where sellerId = ?";
    const res= await myPromise(db, [id]);
    res[0].province=JSON.parse(res[0].province)
    return res
  },
  async editStoreInfo(data) {
    const {sellerId,desc,name,province,detailAddress,phone}=data
    const db = "update store set `desc` = ? , name = ? , province = ? , detailAddress = ? , phone = ? where sellerId = ?";
    return await myPromise(db, [desc,name,JSON.stringify(province),detailAddress,phone,sellerId]);
  },

  async getOrderList(sellerId, serverAddress) {
    const sellerCarIdDb = "select id from car where sellerId = ?";
    const sellerCarIdsRes = await myPromise(sellerCarIdDb, [sellerId]);
    const sellerCarIds = sellerCarIdsRes.map((e) => e.id);
    const orderDb = "select * from `order` where carId in (?)";
    const orderRes = await myPromise(orderDb, [sellerCarIds]);
    if (orderRes.length > 0) {
      return Promise.all(
        orderRes.map(async (order) => {
          const buyerInfo = "select * from users where id = ?";
          const buyerInfoRes = await myPromise(buyerInfo, [order.buyerId]);
          const carInfo = "select * from car where id = ?";
          const carInfoRes = await myPromise(carInfo, [order.carId]);
          const carInfos = carResFormat(carInfoRes, serverAddress);
          const shippingAddressDb =
            "select * from buyer_shipping_address where id = ?";
          const shippingAddressRes = await myPromise(shippingAddressDb, [
            order.buyerShippingAddressId,
          ]);

          return {
            ...order,
            // id: order.id,
            buyerInfo: buyerInfoRes[0],
            carInfo: carInfos[0],
            // count: order.count,
            totalPrice: parseInt(order.count) * parseInt(order.price),
            shippingAddress: shippingAddressRes[0],
            createdAt: moment(order.createdAt).format("YYYY-MM-DD HH:mm:ss"),
            // appointmentTime: order.appointmentTime,
            // confirmReciept: order.confirmReciept,
          };
        })
      );
    } else {
      return [];
    }
  },
  async getAfterSale(sellerId, serverAddress) {
    const afterSaledb =
      "select * from after_sale where sellerId = ? and afterSaleType != 0";
    const afterSaleRes = await myPromise(afterSaledb, [sellerId]);
    return Promise.all(
      afterSaleRes.map(async (afterSale) => {
        const orderInfoDb = "select * from `order` where id = ?";
        const orderInfoRes = await myPromise(orderInfoDb, [afterSale.orderId]);

        const buyerInfoDb = "select * from buyer_shipping_address where id = ?";
        const buyerInfoRes = await myPromise(buyerInfoDb, [
          orderInfoRes[0].buyerShippingAddressId,
        ]);
        const carInfoDb = "select * from car where id = ?";
        const carInfoRes = await myPromise(carInfoDb, [afterSale.carId]);
        const carInfo = carResFormat(carInfoRes, serverAddress);
        return {
          orderInfo: orderInfoRes[0],
          buyerInfo: buyerInfoRes[0],
          carInfo: carInfo[0],
          ...afterSale,
          createdAt: moment(afterSale.createdAt).format("YYYY-MM-DD HH:mm:ss"),
        };
      })
    );
  },
  async getToDoList(sellerId, serverAddress) {
    const afterSaledb =
      "select * from after_sale where sellerId = ? and afterSaleType != 0 and isProcessed = 0";
    const afterSaleRes = await myPromise(afterSaledb, [sellerId]);
    return Promise.all(
      afterSaleRes.map(async (afterSale) => {
        const orderInfoDb = "select * from `order` where id = ?";
        const orderInfoRes = await myPromise(orderInfoDb, [afterSale.orderId]);

        const buyerInfoDb = "select * from buyer_shipping_address where id = ?";
        const buyerInfoRes = await myPromise(buyerInfoDb, [
          orderInfoRes[0].buyerShippingAddressId,
        ]);
        const carInfoDb = "select * from car where id = ?";
        const carInfoRes = await myPromise(carInfoDb, [afterSale.carId]);
        const carInfo = carResFormat(carInfoRes, serverAddress);
        return {
          orderInfo: orderInfoRes[0],
          buyerInfo: buyerInfoRes[0],
          carInfo: carInfo[0],
          ...afterSale,
          createdAt: moment(afterSale.createdAt).format("YYYY-MM-DD HH:mm:ss"),
        };
      })
    );
  },
  async dealAfterSale(data){
    const {id,sellerDesc,isProcessed,isSuccess,orderId}=data
    const db='update after_sale set isProcessed = ? , sellerDesc = ?,isSuccess= ? where id = ?'
    const orderDb='update `order` set isProcessed = ?,isSuccess = ? where id = ?'
    const orderRes=await myPromise(orderDb,[parseInt(isProcessed),isSuccess,orderId])
    return await myPromise(db,[parseInt(isProcessed),sellerDesc,isSuccess,id])
  }
};
exports = module.exports = seller;
