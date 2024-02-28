/*
 * @Date: 2023-12-06 17:39:14
 * @LastEditTime: 2024-02-28 15:04:08
 * @FilePath: \car-mall-system\src\router\constant.ts
 * @Description: 全局路由懒加载文件
 */
// export const Home = () => import('@/layout/index.vue')
const Login = () => import("@/views/Login.vue");
const NotFound = () => import("@/views/404.vue");
const buyer = {
  Home: () => import("@/views/buyer/Home.vue"),
  Detail: () => import("@/views/buyer/Detail.vue"),
  Person: () => import("@/views/buyer/Person.vue"),
  // Concret: () => import("@/views/buyer/Concret.vue"),
  Category: () => import("@/views/buyer/Category.vue"),
  CarDetail: () => import("@/views/buyer/CarDetail.vue"),
};
const seller = {
  Home: () => import("@/views/seller/Home.vue"),
  // Detail: () => import("@/views/seller/Detail.vue"),
  Person: () => import("@/layout/person.vue"),
  Shop: () => import("@/views/seller/Shop.vue"),
  ShopList: () => import("@/views/seller/ShopList.vue"),
  // AddCar: () => import("@/views/seller/AddCar.vue"),
  Order: () => import("@/views/seller/Order.vue"),
  OrderList: () => import("@/views/seller/OrderList.vue"),
  AfterSale: () => import("@/views/seller/AfterSale.vue"),
  StoreManage: () => import("@/views/seller/StoreManage.vue"),
};
const admin = {
  Home: () => import("@/views/admin/Home.vue"),
  // Person: () => import("@/layout/person.vue"),
};
export { Login, NotFound, buyer, seller, admin };
