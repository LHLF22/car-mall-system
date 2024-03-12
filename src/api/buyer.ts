/*
 * @Date: 2023-12-08 09:19:41
 * @LastEditTime: 2024-03-11 17:56:45
 * @FilePath: \car-mall-system\src\api\buyer.ts
 * @Description:用户的api
 */
import http from "../utils/request-utils";
import { buyer } from "../interface/buyer";
const buyerId = JSON.parse(localStorage.getItem("userInfo")).id;
// const buyerId = 20
namespace buyerApi {
  export namespace home {
    /* 获取所有的汽车 */
    export const getAllCar = () => {
      return http.get(`/buyer/allCar/${buyerId}`);
    };
    /* 根据搜索条件返回符合的汽车： */
    export const getSpecialCar=(data)=>{
      return http.post(`/buyer/findCar/${buyerId}`,data);
    }
    
  }
  export namespace layout {
    export const getCarType = () => {
      return http.get("/buyer/carType");
    };
  }
  export namespace category {
    export const getCarCategory = (data: buyer.category.getCarCategoryType) => {
      return http.post("/buyer/carCategorySpecial", data);
    };
    export const getCategoryNameAll = (
      data: buyer.category.getCarCategoryType
    ) => {
      return http.post("/buyer/carCategoryNameAll", data);
    };
    export const getCarSpecial = (data: { name: string; tag: string }[]) => {
      return http.post(`/buyer/carSpecial/${buyerId}`, data);
    };
  }
  export namespace carDetail {
    export const getCarSpecialById = (id: any) => {
      return http.get(`/buyer/carSpecial/${id}/${buyerId}`);
    };
    export const getStaticArea = () => {
      return http.get("/buyer/getArea");
    };
    export const shopcartCreate = (data: any) => {
      return http.post(`/buyer/shopcart/create/${buyerId}`, data);
    };
    export const shopcartEdit = (data: any) => {
      return http.post(`/buyer/shopcart/edit/${buyerId}`, data);
    };
    export const getShopCart = () => {
      return http.get(`/buyer/shopcart/info/${buyerId}`);
    };
    export const deleteShopCart = (data: any) => {
      return http.post(`/buyer/shopcart/delete/${buyerId}`, data);
    };
    export const shopCartPay = (data: any) => {
      return http.post(`/buyer/shopcart/pay/${buyerId}`, data);
    };

    /* 获取收获地址 */
    export const getShippingAddress = () => {
      return http.get(`/buyer/shippingAddress/${buyerId}`);
    };
    /* 修改收获地址 :某条收货地址的信息*/
    export const editShippingAddress = (data: any) => {
      return http.post(`/buyer/shippingAddress/edit/${buyerId}`, data);
    };
    /* 删除某些收货地址 */
    export const deleteShippingAddress = (data: any) => {
      return http.delete(`/buyer/shippingAddress/delete/${data}/${buyerId}`);
    };
    /* 新增收获地址 */
    export const addShippingAddress = (data: any) => {
      return http.post(`/buyer/shippingAddress/add/${buyerId}`, data);
    };
  }
  export namespace person {
    /* 获取买家的订单 */
    export const getBuyerOrder = () => {
      return http.get(`/buyer/order/${buyerId}`);
    };
    /* 确认收获 */ 
    export const confirmReciept=(data)=>{
      //data为order.id
      return http.get(`/buyer/order/confirm/${data.carId}/${data.buyerOrderId}`)
    }
    /* 申请退款与售后 */
    export const afterSale=(data)=>{
      //data为order.id
      return http.post(`/buyer/order/afterSale/${buyerId}`,data)
    }
    /* 获取退款与售后 */
    export const getAfterSale=()=>{
      return http.get(`/buyer/order/afterSale/${buyerId}`)
    }
    /* 撤销退款与售后的申请 */
    export const cancelApplication=(afterSaleId,orderId)=>{
      return http.get(`/buyer/order/afterSale/cancel/${afterSaleId}/${orderId}`)
    }
    export const createFavor=(data)=>{
      return http.post(`/buyer/favor/add/${buyerId}`,data)
    }
    export const deleteFavor=(data)=>{
      return http.post(`/buyer/favor/delete/${buyerId}`,data)
    }
    export const getFavorList=()=>{
      return http.get(`/buyer/favor/${buyerId}`)
    }
  }
}
export default buyerApi;
