/*
 * @Date: 2023-12-19 16:48:38
 * @LastEditTime: 2024-03-11 16:11:10
 * @FilePath: \car-mall-system\src\store\buyer-layout.ts
 * @Description:
 */
// 在需要持久化的仓库启用
import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import buyerApi from "../api/buyer";
import { ElMessage } from "element-plus";
interface pageType {
  path: string;
  title: string;
}
// interface tagsType {
//   tag: string[];
//   name: string[];
// }
const useBuyerLayoutStore = defineStore(
  "buyerLayoutStore",
  () => {
    /* 获取侧栏汽车分类数据 */
    let carTypeData = ref<any[]>([]);
    const changeCarTypeData = (data: []) => {
      carTypeData.value = data;
    };
    /* 当前路由 */
    let currentPage = reactive<pageType>({ path: "", title: "" });
    const changeCurrentPage = (page: pageType) => {
      currentPage = page;
    };
    /* 当前选择的category标签 */
    let tags = ref<{ name: string; tag: string }[]>([]);
    const deleteTag = (index) => {
      tags.value.splice(index, 1);
    };
    const addTag = (data) => {
      tags.value.push(data);
    };
    /* 获取全国地址分类 */
    const areaData = ref<any[]>([]);
    const getArea = () => {
      buyerApi.carDetail.getStaticArea().then((res) => {
        areaData.value = res.data;
      });
    };
    /* 获取用户的购物车 */
    const shopCart = ref<any[]>([]);
    //当调用创建和修改购物车数据时也调用这个方法
    const getShopCart = () => {
      buyerApi.carDetail.getShopCart().then((res) => {
        if (res.code == 0) {
          shopCart.value = res.data;
        } else {
          shopCart.value = [];
        }
      });
    };
    const createShopCart = (carId, count) => {
      return new Promise((resolve, reject) => {
        buyerApi.carDetail.shopcartCreate({ carId, count }).then((res) => {
          if (res.code == 0) {
            getShopCart();
            resolve(true);
          } else {
            // ElMessage.error('加入购物车失败，请稍后重试')
            reject();
          }
        });
      });
    };
    const editShopCart = (carId, count) => {
      return new Promise((resolve, reject) => {
        buyerApi.carDetail.shopcartEdit({ carId, count }).then((res) => {
          if (res.code == 0) {
            getShopCart();
            resolve(true);
          } else {
            // ElMessage.error('更新购物车失败，请稍后重试')
            reject();
          }
        });
      });
    };
    /* 获取用户的收货地址 */
    const shippingAddress = ref<any[]>([]);
    const getShippingAddress = () => {
      buyerApi.carDetail.getShippingAddress().then((res) => {
        if (res.code == 0) {
          shippingAddress.value = res.data;
        } else {
          shippingAddress.value = [];
        }
      });
    };
    /* 获取用户的订单 */
    const buyerOrder = ref<any[]>([]);
    const getBuyerOrder = () => {
      buyerApi.person.getBuyerOrder().then((res) => {
        if (res.code == 0) {
          buyerOrder.value = res.data;
        } else {
          buyerOrder.value = [];
        }
      });
    };
    /* 获取用户的退款售后 */
    const afterSales=ref<any[]>([]);
    const getAfterSales = () => {
      buyerApi.person.getAfterSale().then((res) => {
        if (res.code == 0) {
          afterSales.value = res.data;
        } else {
          afterSales.value = [];
        }
      });
    };
    /* 获取用户的收藏列表 */
    const favorList=ref<any[]>([]);
    const getFavorList = () => {
      buyerApi.person.getFavorList().then((res) => {
        if (res.code == 0) {
          favorList.value = res.data;
        } else {
          favorList.value = [];
        }
      });
    };
    /* 获取所有的汽车资源 */
    const allCar=ref<any[]>([]);
    const getAllCar = () => {
      buyerApi.home.getAllCar().then((res) => {
        if (res.code == 0) {
          allCar.value = res.data;
        } else {
          allCar.value = [];
        }
      });
    };
    return {
      carTypeData,
      changeCarTypeData,
      currentPage,
      changeCurrentPage,
      tags,
      deleteTag,
      addTag,
      areaData,
      getArea,
      shopCart,
      getShopCart,
      createShopCart,
      editShopCart,
      shippingAddress,
      getShippingAddress,
      buyerOrder,
      getBuyerOrder,
      afterSales,
      getAfterSales,
      favorList,
      getFavorList,
      allCar,
      getAllCar
    };
  },
  { persist: true } // 启用持久化
);

export default useBuyerLayoutStore;
