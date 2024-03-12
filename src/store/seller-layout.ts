/*
 * @Date: 2023-12-19 16:48:38
 * @LastEditTime: 2024-03-11 10:38:46
 * @FilePath: \car-mall-system\src\store\seller-layout.ts
 * @Description:
 */
// 在需要持久化的仓库启用
import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import sellerApi from "../api/seller";
import { ElMessage } from "element-plus";
interface pageType {
  path: string;
  title: string;
}
// interface tagsType {
//   tag: string[];
//   name: string[];
// }
const useSellerLayoutStore = defineStore(
  "sellerLayoutStore",
  () => {
    /* 获取用户的订单 */
    const order = ref<any[]>([]);
    //表格数据的格式化
    const orderTableList = ref<any[]>([]);
    const getSellerOrder = () => {
      sellerApi.order.getOderList().then((res) => {
        if (res.code == 0) {
          order.value = res.data;
          orderTableList.value = res.data.map((el) => ({
            id: el.id,
            carName: el.carInfo.name,
            totalPrice: el.totalPrice,
            createdAt: el.createdAt,
            count: el.count,
            appointmentTime: el.appointmentTime,
            buyerAddress:
              JSON.parse(el.shippingAddress.province).join("") +
              el.shippingAddress.detailAddress,
            buyerPhone: el.shippingAddress.phone,
            buyerName: el.shippingAddress.name,
            images: el.carInfo.images,
            brand: el.carInfo.brand,
            confirmReciept:
              el.confirmReciept === 1 ? "已确认收货" : "未确认收货",
            afterSaleType:
              el.afterSaleType === 0
                ? "无退款与售后申请"
                : el.afterSaleType === 1
                ? "已收货要退款"
                : el.afterSaleType === 2
                ? "未收货要退款"
                : "其他",
            // desc: el.desc,
            isProcessed: el.isProcessed === 0&&el.afterSaleType!==0 ? "未处理" : el.isProcessed === 1&&el.afterSaleType!==0 ? '商家直接退款':el.isProcessed === 2&&el.afterSaleType!==0? '商家同意退款等待用户送回商品':el.isProcessed === 3&&el.afterSaleType!==0?'拒绝退款':'无需处理',
            isSuccess: el.afterSaleType === 0?'无需退款': el.afterSaleType !==0&&el.isSuccess === 0 ? "未退款" : "已退款",
          }));
        } else {
          order.value = [];
          orderTableList.value = [];
        }
      });
    };
    /* 获取用户的退款与售后 */
    const afterSale = ref<any[]>([]);
    const afterSaleTable = ref<any[]>([]);
    const getAfterSale = () => {
      sellerApi.order.getAfterSale().then((res) => {
        if (res.code == 0) {
          afterSale.value = res.data;
          afterSaleTable.value = res.data.map((el) => ({
            afterSaleType:
              el.afterSaleType === 0
                ? "无退款与售后申请"
                : el.afterSaleType === 1
                ? "已收货要退款"
                : el.afterSaleType === 2
                ? "未收货要退款"
                : "其他",
            createdAt: el.createdAt,
            desc: el.desc,
            orderId: el.orderInfo.id,
            buyerAddress:
              JSON.parse(el.buyerInfo.province).join("") +
              el.buyerInfo.detailAddress,
            buyerPhone: el.buyerInfo.phone,
            buyerName: el.buyerInfo.name,
            carName: el.carInfo.name,
            totalPrice: el.orderInfo.price*el.orderInfo.count,
            images: el.carInfo.images,
            confirmReciept:
              el.orderInfo.confirmReciept === 1 ? "已确认收货" : "未确认收货",
            count: el.orderInfo.count,
            appointmentTime: el.orderInfo.appointmentTime,
            isProcessed: el.isProcessed === 0&&el.afterSaleType!==0 ? "未处理" : el.isProcessed === 1&&el.afterSaleType!==0 ? '商家直接退款':el.isProcessed === 2&&el.afterSaleType!==0? '商家同意退款等待用户送回商品':el.isProcessed === 3&&el.afterSaleType!==0?'拒绝退款':'无需处理',
            isSuccess: el.isSuccess === 0 ? "未退款" : "已退款",
            sellerDesc: el.sellerDesc,
            afterSaleId:el.id,
          }));
        } else {
          afterSale.value = [];
          afterSaleTable.value = [];
        }
      });
    };
    /*  获取用户的待办列表 */
    const toDoList = ref<any[]>([]);
    const toDoListTable = ref<any[]>([]);
    const getToDoList = () => {
      sellerApi.order.getToDoList().then((res) => {
        if (res.code == 0) {
          toDoList.value = res.data;
          toDoListTable.value =res.data.map((el) => ({
            afterSaleType:
              el.afterSaleType === 0
                ? "无退款与售后申请"
                : el.afterSaleType === 1
                ? "已收货要退款"
                : el.afterSaleType === 2
                ? "未收货要退款"
                : "其他",
            createdAt: el.createdAt,
            desc: el.desc,
            afterSaleId:el.id,
            orderId: el.orderInfo.id,
            buyerAddress:
              JSON.parse(el.buyerInfo.province).join("") +
              el.buyerInfo.detailAddress,
            buyerPhone: el.buyerInfo.phone,
            buyerName: el.buyerInfo.name,
            carName: el.carInfo.name,
            totalPrice: el.orderInfo.price*el.orderInfo.count,
            images: el.carInfo.images,
            confirmReciept:
              el.orderInfo.confirmReciept === 1 ? "已确认收货" : "未确认收货",
            count: el.orderInfo.count,
            appointmentTime: el.orderInfo.appointmentTime,
            isProcessed: el.isProcessed === 0&&el.afterSaleType!==0 ? "未处理" : el.isProcessed === 1&&el.afterSaleType!==0 ? '商家直接退款':el.isProcessed === 2&&el.afterSaleType!==0? '商家同意退款等待用户送回商品':'拒绝退款',
            isSuccess: el.isSuccess === 0 ? "未退款" : "已退款",
            sellerDesc: el.sellerDesc,
          }));
        } else {
          toDoList.value = [];
          toDoListTable.value=[]
        }
      });
    };
    /* 获取店铺信息 */
    const storeInfo =ref(null)
    const getStoreInfo=()=>{
      sellerApi.store.getStoreInfo().then((res) => {
        if (res.code == 0) {
          storeInfo.value = res.data;
        } else {
          storeInfo.value=null
        }
      });
    }
    return {
      orderTableList,
      order,
      getSellerOrder,
      afterSale,
      afterSaleTable,
      getAfterSale,
      toDoList,
      toDoListTable,
      getToDoList,
      storeInfo,
      getStoreInfo
    };
  },
  { persist: true } // 启用持久化
);

export default useSellerLayoutStore;
