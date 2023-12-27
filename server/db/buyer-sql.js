/*
 * @Date: 2023-12-13 15:40:01
 * @LastEditTime: 2023-12-27 16:05:22
 * @FilePath: \car-mall-system\server\db\buyer-sql.js
 * @Description:
 */
const connection = require("./connect.js");
const myPromise = (query, params=[]) => {
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
const buyer = {
  async getCarType() {
    const db = "select * from car_tag";
    const res = await myPromise(db);
    const list =await Promise.all(res.map(async (el) => {
      const dbEvery = "select name from car_type where tag= ?";
      let listSecond = await myPromise(dbEvery, [el.name]);
      listSecond=listSecond.map(elem=>elem.name)
      return {
        tag: el.name,
        icon: el.icon,
        list: listSecond
      };
    })) 
    return list;
  },
};
exports = module.exports = buyer;
