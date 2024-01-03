/*
 * @Date: 2023-12-13 10:02:14
 * @LastEditTime: 2024-01-02 16:48:34
 * @FilePath: \car-mall-system\server\router\userRouter.js
 * @Description: 注册、登录
 */
const userSql = require("../db/user-sql");
const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config");
//创建路由对象
function getRoleOfChinese(role) {
  if (role === "buyer") {
    return "买家";
  } else if (role === "seller") {
    return "商家";
  } else {
    return "管理员";
  }
}
const userRouter = express.Router();
/* 登录 */
/**
 * @api {post} /user/login 用户登录
 * @apiName 登录
 * @apiGroup 登陆与注册
 * @apiParam {String} account/phone sanhua/19830192015 账号
 * @apiParam {String} password 123456 密码
 * @apiParam {String} role seller 角色
 * @apiSuccessExample Success-Response:
 *     {
 *       "code": 0,
 *       "data": {
 *              role:'buyer',
 *              token:'feawehonch392837xdubcw',
 *              userInfo:{
 *                        id:1
 *                        account:'sanhua',
 *                        password:123456,
 *                        role:"buyer",
 *                        }
 *              },
 *        "msg":"登录成功"
 *     }
 */
//登录逻辑：先查询phone+role或account+role,不存在则直接返回不存在该xx的role，存在的话判断密码是否正确，正确的话，生成token返回
userRouter.post("/login", async (req, res, next) => {
  let passwordRes = {};
  let params = {};
  /* 账号登录 */
  if (req.body.account) {
    const { account, password, role } = req.body;
    params = { account, password, role };
    const result = await userSql.isRoleHasAccount(params);
    if (result.length > 0) {
      passwordRes = await userSql.verifyAccountPassword(params);
    } else {
      return res.send({
        code: -1,
        msg: `不存在账号为${account}的${getRoleOfChinese(role)}`,
      });
    }
  } else {
    /* 密码登录 */
    const { phone, password, role } = req.body;
    params = { phone, password, role };
    const result = await userSql.isRoleHasPhone(params);
    if (result.length > 0) {
      passwordRes = await userSql.verifyPhonePassword(params);
    } else {
      return res.send({
        code: -1,
        msg: `不存在手机号为${phone}的${getRoleOfChinese(role)}`,
      });
    }
  }
  // console.log("存在用户的话你才会看到这段代码");
  if (passwordRes.length > 0) {
    const tokenStr = jwt.sign(
      { ...params, password: "" },
      config.jwtSecretKey,
      {
        expiresIn: "10h", // token 有效期为 10 个小时
      }
    );
    // console.log(passwordRes, "passwordRes");
    const { id, phone, account, role, gender, introduction,password } = passwordRes[0];
    res.send({
      code: 0,
      msg: "登录成功",
      data: {
        role: params.role,
        token: tokenStr,
        userInfo: {
          id,
          account,
          phone,
          password,
          role,
          gender,
          introduction,
        },
      },
    });
  } else {
    res.send({
      code: -1,
      msg: "密码错误",
    });
  }
});
/* 注册 */
/**
 * @api {post} /user/register 用户注册
 * @apiName 用户注册
 * @apiGroup 登陆与注册
 * @apiParam {String} phone 19830192015 手机号
 * @apiParam {String} password 123456 密码
 * @apiParam {String} role seller 角色
 * @apiSuccessExample Success-Response:
 *     {
 *       code: 0,
 *        msg:"注册成功"
 *     }
 */
//我的注册逻辑，先判断code是不是为0，不为0的话判断是否正确，正确的话就进行注册，
userRouter.post("/register", async (req, res, next) => {
  const { phone, password, role, code } = req.body;
  const result = await userSql.getPhoneCode(phone);
  if (result.length > 0) {
    if (result[0].code == 0) {
      res.send({
        code: -1,
        msg: "验证码过期了，请重新发送",
      });
    } else {
      const verifyCodeRes = await userSql.verifyCode({
        phone,
        code,
      });
      if (verifyCodeRes.length > 0) {
        const register = await userSql.register({ phone, password, role });
        if (register.affectedRows === 1) {
          res.send({
            code: 0,
            //查一下注册成功需要返回什么TODO:
            /* data:{
              id:register.insertId,
              phone,
              role,
            }, */
            msg: "注册成功",
          });
        } else {
          res.send({
            code: -1,
            msg: "服务器错误",
          });
        }
      } else {
        res.send({
          code: -1,
          msg: "验证码错误",
        });
      }
    }
  } else {
    res.send({
      code: -1,
      msg: "验证码错误",
    });
  }
});
/* 获取验证码 */
/**
 * @api {post} /user/code 发送验证码
 * @apiName 发送验证码
 * @apiGroup 登陆与注册
 * @apiParam {String} phone 19830192017 手机号
 * @apiSuccessExample Success-Response:
 *     {
 *       code: 0,
 *       data: {
 *              code:3298
 *             },
 *        msg:"登录成功"
 *     }
 */
userRouter.post("/code", async (req, res, next) => {
  const { phone } = req.body;
  const isPhoneExit = await userSql.isPhoneExit(phone);
  if (isPhoneExit.length > 0) {
    res.send({
      code: -2,
      msg: "该手机号已经注册过了",
    });
  } else {
    const result = await userSql.sendPhoneCode(phone);
    if (result.result.affectedRows === 1) {
      setTimeout(() => {
        userSql.clearPhoneCode(phone);
      }, 60 * 1000);
      res.send({
        code: 0,
        data: {
          code: result.code,
        },
        msg: `获取验证码成功: ${result.code}`,
      });
    } else {
      userSql.clearPhoneCode();
      res.send({
        code: -1,
        msg: "获取验证码失败",
      });
    }
  }
});

/* 修改用户名 */
userRouter.post("/username", async (req, res, next) => {
  const { account, role, id } = req.body;
  const isExitAccount = await userSql.isRoleHasAccount({ account, role });
  if (isExitAccount.length > 0) {
    res.send({
      code: -1,
      msg: "该用户名已存在",
    });
  } else {
    const result = await userSql.editAccountName({ account, id });
    if (result.affectedRows === 1) {
      // console.log(result,'result')
      res.send({
        code: 0,
        data: {
          account,
        },
        msg: "修改用户名成功",
      });
    } else {
      res.send({
        code: -1,
        msg: "出错啦",
      });
    }
  }
});
/* 修改密码 */
userRouter.post("/password", async (req, res, next) => {
  const { password, id } = req.body;
  const result = await userSql.editPassword({ password, id });
    if (result.affectedRows === 1) {
      // console.log(result,'result')
      res.send({
        code: 0,
        data: {
          password,
        },
        msg: "修改密码成功",
      });
    } else {
      res.send({
        code: -1,
        msg: "出错啦",
      });
    }
});
/* 修改性别 */
userRouter.post("/gender", async (req, res, next) => {
  const { gender, id } = req.body;
  const result = await userSql.editGender({ gender, id });
    if (result.affectedRows === 1) {
      // console.log(result,'result')
      res.send({
        code: 0,
        data: {
          gender,
        },
        msg: "修改密码成功",
      });
    } else {
      res.send({
        code: -1,
        msg: "出错啦",
      });
    }
});
/* 修改个人简介 */
userRouter.post("/introduction", async (req, res, next) => {
  const { introduction, id } = req.body;
  const result = await userSql.editIntroduction({ introduction, id });
    if (result.affectedRows === 1) {
      // console.log(result,'result')
      res.send({
        code: 0,
        data: {
          introduction,
        },
        msg: "修改密码成功",
      });
    } else {
      res.send({
        code: -1,
        msg: "出错啦",
      });
    }
});
// 将路由对象向外导出
module.exports = userRouter;
