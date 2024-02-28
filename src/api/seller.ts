/*
 * @Date: 2023-12-08 09:19:41
 * @LastEditTime: 2024-02-28 11:41:57
 * @FilePath: \car-mall-system\src\api\seller.ts
 * @Description:用户的api
 */
import http from "../utils/request-utils";
import { seller } from "../interface/seller";
const sellerId = JSON.parse(localStorage.getItem("userInfo")).id;

namespace sellerApi {
  export namespace shop {
    export const setImg = (data: seller.shop.uploadImgType) => {
      return http.post(`/seller/upload/${data.id}/${sellerId}`, data.formData);
    };
    export const getAllCarDeail = () => {
      return http.get(`/seller/carDetail/${sellerId}`);
    };

    export const editCarProduct = (data: any) => {
      return http.post(`/seller/car/edit`, data.form);
    };
    export const deleteCarProduct = (data: any) => {
      return http.delete(`/seller/car/delete/${data.id}`);
    };
    /* 获取静态数据 */
    export const getStaticCarDisposition = () => {
      return http.get(`/seller/car/staticDisposition`);
    };

    export const getCarAllSeats = () => {
      return http.get(`/seller/car/seats/${sellerId}`);
    };

    export const getCarAllBrand = () => {
      return http.get(`/seller/car/brand/${sellerId}`);
    };
    export const getCarAllCarType = () => {
      return http.get(`/seller/car/carType/${sellerId}`);
    };
    export const getCarAllEnergyType = () => {
      return http.get(`/seller/car/energyType/${sellerId}`);
    };
    export const getCarAllDisplacement = () => {
      return http.get(`/seller/car/displacement/${sellerId}`);
    };
    export const getCarAllTransmissionType = () => {
      return http.get(`/seller/car/transmissionType/${sellerId}`);
    };
    export const getCarAllProductionMode = () => {
      return http.get(`/seller/car/productionMode/${sellerId}`);
    };

    export const getCarAllIntakeForm = () => {
      return http.get(`/seller/car/intakeForm/${sellerId}`);
    };
  }
  export namespace store {
    /* id为商家id */
    export const getStoreInfo = (data: { id: string }) => {
      return http.get(`/seller/store/${data.id}`);
    };
    export const editStoreName = (data: any) => {
      return http.post(`/seller/store/editName`, data);
    };
    export const editStoreDesc = (data: any) => {
      return http.post(`/seller/store/editDesc`, data);
    };
  }
}
export default sellerApi;
