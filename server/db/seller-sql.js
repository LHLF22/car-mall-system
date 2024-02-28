/*
 * @Date: 2023-12-13 15:40:01
 * @LastEditTime: 2024-02-28 15:54:19
 * @FilePath: \car-mall-system\server\db\seller-sql.js
 * @Description:
 */
const moment = require("moment");
const { priceFormat } = require("../utils.js");
const connection = require("./connect.js");
const myPromise = (query, params = []) => {
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

    return res;
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
    return await myPromise(db, [id]);
  },

  async editStoreName(id, name) {
    const db = "update store set name = ? where sellerId = ?";
    return await myPromise(db, [name, id]);
  },
  async editStoreDesc(id, desc) {
    const db = "update store set desc = ? where sellerId = ?";
    return await myPromise(db, [desc, id]);
  },
};
exports = module.exports = seller;
