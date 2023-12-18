/*
 * @Date: 2023-12-13 15:40:01
 * @LastEditTime: 2023-12-14 15:58:22
 * @FilePath: \car-mall-system\server\db\user-sql.js
 * @Description:
 */
const connection = require("./connect.js");
function generateFourDigitNumber() {
  var randomNumber = Math.floor(Math.random() * 9000) + 1000;
  return randomNumber.toString();
}
const user = {
  /* 登录 */
  login({ account, password, role }) {},
  /* register({phone,password,confirmPassword,code}){
    const isPhoneExitSql=`select * from users where phone=${phone}`
    const isPhoneExit=new Promise((resolve,reject)=>{
      connection.query(db,(err,result)=>{
        if(err){
          reject(err)
        }
        resolve(result)
      })
    })
    if(isPhoneExit.length>0){
      
    }
  }, */
  /* 注册时，获取验证码时，确认该手机号是否存在 */
  isPhoneExit(phone) {
    const db = `select * from users where phone=${phone}`;
    return new Promise((resolve, reject) => {
      connection.query(db, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  /* 发送验证码时，确认在手机号验证码表中是否有该手机号 */
  isPhoneExitForCode(phone) {
    const db = `select * from verification_codes where phone_number=${phone}`;
    return new Promise((resolve, reject) => {
      connection.query(db, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  /* 发送验证码 */
  async sendPhoneCode(phone) {
    const code = generateFourDigitNumber();
    const isPhoneExitForCode = await this.isPhoneExitForCode(phone);
    //当存在该手机号
    if (isPhoneExitForCode.length > 0) {
      const updateCode =
        "update verification_codes set code =?,created_at = CURRENT_TIMESTAMP where phone_number=?";
      return new Promise((resolve, reject) => {
        connection.query(updateCode, [code, phone], (err, result) => {
          if (err) {
            reject(err);
          }
          resolve({ result, code });
        });
      });
    } else {
      //不存在该手机号
      const insetCode =
        "insert into verification_codes (code,phone_number,created_at) values (?,?,CURRENT_TIMESTAMP)";
      return new Promise((resolve, reject) => {
        connection.query(insetCode, [code, phone], (err, result) => {
          if (err) {
            reject(err);
          }
          resolve({ result, code });
        });
      });
    }
  },
  /* 清除验证码 */
  clearPhoneCode(phone) {
    const updateCode =
      "update verification_codes set code =0,created_at = CURRENT_TIMESTAMP where phone_number=?";
    return new Promise((resolve, reject) => {
      connection.query(updateCode, [phone], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  /* 查询验证码 */
  getPhoneCode(phone) {
    const db = "select code from verification_codes where phone_number = ?";
    return new Promise((resolve, reject) => {
      connection.query(db, [phone], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  /* 用户注册 */
  register({phone,password,role}){
    // console.log(phone,'here')
    const db="insert into users (phone,password,role,addtime) values (?,?,?,CURRENT_TIMESTAMP)"
    return new Promise((resolve, reject) => {
      connection.query(db, [phone,password,role], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  //查询所有用户信息
  LoginByAccount(account) {
    const db =
      "select * from manager where name='" +
      account.name +
      "' and password = '" +
      account.password +
      "'";
    return new Promise((resolve, reject) => {
      connection.query(db, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  //登录后更新manager的token
  UpdateToken(token) {
    const db = "update manager set token ='" + token + "'";
    return new Promise((resolve, reject) => {
      connection.query(db, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
};
exports = module.exports = user;
