/*
 * @Date: 2023-12-13 15:40:01
 * @LastEditTime: 2024-01-03 17:27:52
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
  /* 获取所有汽车分类和详细分类 */
  async getCarType() {
    const db = "select * from car_tag";
    const res = await myPromise(db);
    const list =await Promise.all(res.map(async (el) => {
      const dbEvery = "select name,id from car_type where tag= ?";
      let listSecond = await myPromise(dbEvery, [el.name]);
      listSecond=listSecond.map(elem=>({name:elem.name,id:elem.id}))
      return {
        type:{id:el.id,tag:el.name,icon:el.icon},
        list: listSecond
      };
    })) 
    return list;
  },
  /* 通过id获取汽车分类 */
  async getCarCategory(id){
    const db="select * from car_tag where id= ?"
    return await myPromise(db,[id])
    
  },
  /* 通过id获取详细分类 */
  async getCarConcret(id){
    const db="select * from car_type where id= ?"
    return await myPromise(db,[id])
    
  }
};
exports = module.exports = buyer;
