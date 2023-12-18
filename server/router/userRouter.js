/*
 * @Date: 2023-12-13 10:02:14
 * @LastEditTime: 2023-12-14 16:25:17
 * @FilePath: \car-mall-system\server\router\userRouter.js
 * @Description: 注册、登录
 */
const userSql = require("../db/user-sql");
const utils = require("../utils");
const express = require("express");
//创建路由对象
const userRouter = express.Router();
/* 登录 */
/**
 * @api {post} /user/login 用户登录
 * @apiName 登录
 * @apiGroup 登陆与注册
 * @apiParam {String} account=''
 * @apiParam {String} password=''
 * @apiParam {String} role=''
 * @apiSuccess {Number} code 0
 * @apiSuccess {Object} data 用户信息和token
 * @apiSuccess {String} msg 提示信息
 * @apiSuccessExample Success-Response:
 *     {
 *       "code": 0,
 *       "data": {
 *              id:1
 *              account:'sanhua',
 *              password:123456,
 *              role:"buyer",
 * },
 *        "msg":"登录成功"
 *     }
 */
userRouter.post("/login", async (req, res, next) => {
  //console.log(req.query)
  let { offset, size } = req.query;
  const result = await user.getTotalCount();
  if (result.length > 0) {
    const totalCount = result[0].count;
    //获取所有数据
    let listResult = [];
    if (offset === "0" && size === "0") {
      listResult = await user.getAllList();
    } else {
      listResult = await user.getListByPagination(
        parseInt(offset),
        parseInt(size)
      );
    }

    //console.log(listResult,'hhhh')
    if (listResult.length > 0) {
      //console.log(listResult)
      res.send({
        code: 0,
        message: "请求数据成功",
        data: {
          totalCount,
          listResult,
        },
      });
    }
  } else {
    res.send({
      code: -1,
      message: "no data",
    });
  }
});
/* 注册 */
/**
 * @api {get} /user/login 注册用户
 * @apiGroup 登陆与注册
 */
userRouter.post("/register", async (req, res, next) => {
  const { phone, password, role, code } = req.body;
  const result = await userSql.getPhoneCode(phone);
  // console.log(result);
  if (result.length > 0) {
    if(result.code===0){
      res.send({
        code:-1,
        msg:'验证码过期了，请重新发送'
      })
    }else{
      const register=await userSql.register({phone,password,role})
      if(register.affectedRows===1){
        res.send({
          code:0,
          data:{
            id:register.insertId,
            account:phone,
            role,
          },
          msg:'注册成功'
        })
      }else{
        res.send({
          code:-1,
          msg:'服务器错误'
        })
      }
    }
  } else {
    res.send({
      code:-1,
      msg:'验证码错误'
    })
  }
});
/* 获取验证码 */
/**
 * @api {post} /user/code 发送验证码
 * @apiName 发送验证码
 * @apiGroup 登陆与注册
 * @apiParam {String} phone=''
 * @apiSuccess {Number} code 0
 * @apiSuccess {Object} data 验证码code
 * @apiSuccess {String} msg 提示信息
 * @apiSuccessExample Success-Response:
 *     {
 *       code: 0,
 *       data: {
 *              code:3298
 * },
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
// 将路由对象向外导出
module.exports = userRouter;
