/*
 * @Date: 2023-12-13 15:40:01
 * @LastEditTime: 2024-02-28 14:22:15
 * @FilePath: \car-mall-system\server\db\user-sql.js
 * @Description:
 */
const { myPromise } = require("../utils.js");
const connection = require("./connect.js");
function generateFourDigitNumber() {
  var randomNumber = Math.floor(Math.random() * 9000) + 1000;
  return randomNumber.toString();
}
const user = {
  /* 该角色是否有该账号 */
  isRoleHasAccount({ account, role }) {
    const db = `select * from users where account=? and role=?`;
    return new Promise((resolve, reject) => {
      connection.query(db, [account, role], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  /* 该角色是否有这手机号 */
  isRoleHasPhone({ phone, role }) {
    const db = `select * from users where phone=? and role=?`;
    return new Promise((resolve, reject) => {
      connection.query(db, [phone, role], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  /* 验证账号登录时密码是否正确 */
  verifyAccountPassword({ account, password, role }) {
    const db = `select * from users where account=? and role=? and password=?`;
    return new Promise((resolve, reject) => {
      connection.query(db, [account, role, password], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  /* 验证手机号登录时密码是否正确 */
  verifyPhonePassword({ phone, password, role }) {
    const db = `select * from users where phone=? and role=? and password=?`;
    return new Promise((resolve, reject) => {
      connection.query(db, [phone, role, password], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

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
  /* 验证验证码是否正确 */
  verifyCode({ phone, code }) {
    const db =
      "select * from verification_codes where phone_number = ? and code = ?";
    return new Promise((resolve, reject) => {
      connection.query(db, [phone, code], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  /* 用户注册 */
  register({ phone, password, role }) {
    const db =
      "insert into users (phone,password,role,addtime) values (?,?,?,CURRENT_TIMESTAMP)";
    return new Promise((resolve, reject) => {
      connection.query(db, [phone, password, role], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  distributionStore(id) {
    const db = "insert into store (sellerId) values (?)";
    return new Promise((resolve, reject) => {
      connection.query(db, [id], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  deleteUser(id) {
    const db = "delete from users where id =?";
    return new Promise((resolve, reject) => {
      connection.query(db, [id], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  /* 修改用户名 */
  editAccountName({ account, id }) {
    const db = `update users set account =? where id= ?`;
    return new Promise((resolve, reject) => {
      connection.query(db, [account, id], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  /* 修改密码 */
  editPassword({ password, id }) {
    const db = `update users set password =? where id= ?`;
    return new Promise((resolve, reject) => {
      connection.query(db, [password, id], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  /* 修改性别*/
  editGender({ gender, id }) {
    const db = `update users set gender =? where id= ?`;
    return new Promise((resolve, reject) => {
      connection.query(db, [gender, id], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
  /* 修改个人简介 */
  editIntroduction({ introduction, id }) {
    const db = `update users set introduction =? where id= ?`;
    return new Promise((resolve, reject) => {
      connection.query(db, [introduction, id], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },
};
exports = module.exports = user;
