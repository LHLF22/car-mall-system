/*
 * @Date: 2024-02-22 15:48:05
 * @LastEditTime: 2024-02-28 16:04:44
 * @FilePath: \car-mall-system\server\router\sellerRouter.js
 * @Description:
 */
const sellerSql = require("../db/seller-sql");
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { Blob } = require("blob");
const uploadImg = multer({ dest: "uploads/" });
const sellerRouter = express.Router();

/* 获取汽车静态配置：用于新增与编辑时的下拉框选项 */
sellerRouter.get("/car/staticDisposition", async (req, res, next) => {
  const result = await sellerSql.getStaticCarDisposition();
  if (result.length > 0) {
    const data = {
      brand: result[0].map((el) => el.name),
      carType: result[1].map((el) => el.name),
      seats: result[2].map((el) => el.name),
      energyType: result[3].map((el) => el.name),
      transmissionType: result[4].map((el) => el.name),
      productionMode: result[5].map((el) => el.name),
      intakeForm: result[6].map((el) => el.name),
    };
    // console.log(data, "kkk");
    res.send({
      code: 0,
      data,
      msg: "获取数据成功",
    });
  } else {
    res.send({
      code: -1,
      msg: "获取数据失败",
    });
  }
});
/* 修改图片或新增图片 :若为新增图片，返回新增商品的id,新增图片的同时也为新增商品 */
sellerRouter.post(
  "/upload/:id/:sellerId",
  uploadImg.array("images[]"),
  async (req, res, next) => {
    // console.log(req.files, "ffffa");// formData.append("images[]", file.raw);传过来的新图片
    // console.log(req.body.exitedFile, "sss");//formData.append("exitedFile", file.name);传过来的旧图片的图片名
    let exitedFile = [];
    if (req.body.exitedFile) {
      //传多张图片时req.body.exitedFile为数组
      if (Array.isArray(req.body.exitedFile)) {
        req.body.exitedFile.forEach((el) => {
          exitedFile.push({ newFileName: el, imgPath: "/images/car/" + el });
        });
      } else {
        //传一张时req.body.exitedFile为字符串
        exitedFile.push({
          newFileName: req.body.exitedFile,
          imgPath: "/images/car/" + req.body.exitedFile,
        });
      }
    }
    const imageFiles = req.files;
    const id = req.params.id;
    const sellerId = req.params.sellerId;
    imageFiles.forEach((file) => {
      file.newFileName = Date.now().toString().slice(0, 10) + file.originalname;
      file.imgPath = "/images/car/" + file.newFileName;
      fs.renameSync(file.path, "public" + file.imgPath);
    });
    const imgData = [...exitedFile, ...imageFiles]
      .reduce((all, val) => {
        return (
          all + "," + val.newFileName + ";" + val.imgPath.replace(/\s/g, "")
        );
      }, "")
      .substring(1);
    const result = await sellerSql.setCarImg(id, imgData, sellerId);
    if (result.affectedRows === 1) {
      res.send({
        code: 0,
        msg: id === "-1" ? "新增图片成功" : "修改图片成功",
        // data:result.id
        data: id === "-1" ? { id: result.insertId } : "", //返回新增商品的id
      });
    } else {
      res.send({
        code: -1,
        msg: "出错啦",
      });
    }
  }
);

/* 获取所有汽车商品的数据 */
sellerRouter.get("/carDetail/:sellerId", async (req, res, next) => {
  const sellerId = req.params.sellerId;
  const serverAddress = `${req.protocol}://${req.get("host")}`;
  const result = await sellerSql.getCarDetail(serverAddress, sellerId);
  if (result.length > 0) {
    res.send({
      code: 0,
      data: result,
    });
  } else {
    res.send({
      code: -1,
      msg: "出错啦",
    });
  }
});

/* 修改商品 */
sellerRouter.post("/car/edit", async (req, res, next) => {
  const {
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
    intakeForm,
  } = req.body;
  const result = await sellerSql.updateCarProduct(
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
  );
  if (result.affectedRows === 1) {
    res.send({
      code: 0,
      msg: "修改成功",
    });
  } else {
    res.send({
      code: -1,
      msg: "出错啦",
    });
  }
});
/* 删除商品 */
sellerRouter.delete("/car/delete/:id", async (req, res, next) => {
  const result = await sellerSql.deleteCarProduct(req.params.id);
  // console.log(result, "delete");
  if (result.affectedRows === 1) {
    res.send({ code: 0, msg: "删除成功" });
  } else {
    res.send({ code: -1, msg: "删除失败" });
  }
});
/* 获取所有的座位数 */
sellerRouter.get("/car/seats/:sellerId", async (req, res, next) => {
  const sellerId = req.params.sellerId;
  const result = await sellerSql.getCarAllSeats(sellerId);
  /*  console.log(
    result.map((el) => el.seats),
    "mmm"
  ); */
  if (result.length > 0) {
    res.send({
      code: 0,
      data: result.map((el) => el.seats),
    });
  } else {
    res.send({
      code: -1,
    });
  }
});
/* 获取所有的品牌 */
sellerRouter.get("/car/brand/:sellerId", async (req, res, next) => {
  const sellerId = req.params.sellerId;
  const result = await sellerSql.getCarAllBrand(sellerId);
  /*  console.log(
    result.map((el) => el.seats),
    "mmm"
  ); */
  if (result.length > 0) {
    res.send({
      code: 0,
      data: result.map((el) => el.brand),
    });
  } else {
    res.send({
      code: -1,
    });
  }
});
/* 获取所有的车身类型*/
sellerRouter.get("/car/carType/:sellerId", async (req, res, next) => {
  const sellerId = req.params.sellerId;
  const result = await sellerSql.getCarAllCarType(sellerId);
  /*  console.log(
    result.map((el) => el.seats),
    "mmm"
  ); */
  if (result.length > 0) {
    res.send({
      code: 0,
      data: result.map((el) => el.carType),
    });
  } else {
    res.send({
      code: -1,
    });
  }
}); /* 获取所有的能源类型 */
sellerRouter.get("/car/energyType/:sellerId", async (req, res, next) => {
  const sellerId = req.params.sellerId;
  const result = await sellerSql.getCarAllEnergyType(sellerId);
  /*  console.log(
    result.map((el) => el.seats),
    "mmm"
  ); */
  if (result.length > 0) {
    res.send({
      code: 0,
      data: result.map((el) => el.energyType),
    });
  } else {
    res.send({
      code: -1,
    });
  }
}); /* 获取所有的排量 */
sellerRouter.get("/car/displacement/:sellerId", async (req, res, next) => {
  const sellerId = req.params.sellerId;
  const result = await sellerSql.getCarAllDisplacement(sellerId);
  /*  console.log(
    result.map((el) => el.seats),
    "mmm"
  ); */
  if (result.length > 0) {
    res.send({
      code: 0,
      data: result.map((el) => el.displacement),
    });
  } else {
    res.send({
      code: -1,
    });
  }
}); /* 获取所有的变速器类型 */
sellerRouter.get("/car/transmissionType/:sellerId", async (req, res, next) => {
  const sellerId = req.params.sellerId;
  const result = await sellerSql.getCarAllTransmissionType(sellerId);
  /*  console.log(
    result.map((el) => el.seats),
    "mmm"
  ); */
  if (result.length > 0) {
    res.send({
      code: 0,
      data: result.map((el) => el.transmissionType),
    });
  } else {
    res.send({
      code: -1,
    });
  }
}); /* 获取所有的生产方式 */
sellerRouter.get("/car/productionMode/:sellerId", async (req, res, next) => {
  const sellerId = req.params.sellerId;
  const result = await sellerSql.getCarAllProductionMode(sellerId);
  /*  console.log(
    result.map((el) => el.seats),
    "mmm"
  ); */
  if (result.length > 0) {
    res.send({
      code: 0,
      data: result.map((el) => el.productionMode),
    });
  } else {
    res.send({
      code: -1,
    });
  }
}); /* 获取所有的进气形式*/
sellerRouter.get("/car/intakeForm/:sellerId", async (req, res, next) => {
  const sellerId = req.params.sellerId;
  const result = await sellerSql.getCarAllIntakeForm(sellerId);
  /*  console.log(
    result.map((el) => el.seats),
    "mmm"
  ); */
  if (result.length > 0) {
    res.send({
      code: 0,
      data: result.map((el) => el.intakeForm),
    });
  } else {
    res.send({
      code: -1,
    });
  }
});

sellerRouter.get("/store/:id", async (req, res, next) => {
  const result = await sellerSql.getStoreInfo(req.params.id);
  if (result.length > 0) {
    res.send({
      code: 0,
      data: result[0],
      msg: "获取店铺信息成功",
    });
  } else {
    res.send({
      code: -1,
      msg: "获取店铺信息失败",
    });
  }
});

sellerRouter.post("/store/editName", async (req, res, next) => {
  const result = await sellerSql.editStoreName(req.body.id, req.body.name);
  if (result.affectedRows === 1) {
    res.send({
      code: 0,
      // data: result[0],
      // msg: "获取店铺信息成功",
    });
  } else {
    res.send({
      code: -1,
      // msg: "获取店铺信息失败",
    });
  }
});

sellerRouter.post("/store/editDesc", async (req, res, next) => {
  const result = await sellerSql.editStoreDesc(req.body.id, req.body.desc);
  if (result.affectedRows === 1) {
    res.send({
      code: 0,
      // data: result[0],
      // msg: "获取店铺信息成功",
    });
  } else {
    res.send({
      code: -1,
      // msg: "获取店铺信息失败",
    });
  }
});
module.exports = sellerRouter;
