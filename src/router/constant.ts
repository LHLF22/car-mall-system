/*
 * @Date: 2023-12-06 17:39:14
 * @LastEditTime: 2023-12-19 15:12:39
 * @FilePath: \car-mall-system\src\router\constant.ts
 * @Description: 全局路由懒加载文件
 */
// export const Home = () => import('@/layout/index.vue')
const Login = () => import("@/views/Login.vue");
const NotFound = () => import("@/views/404.vue");
const buyer = {
  Home: () => import("@/views/buyer/Home.vue"),
  Detail: () => import("@/views/buyer/Detail.vue"),
};
const seller = {
  Home:() => import("@/views/seller/Home.vue"),
  Detail:()=>import('@/views/seller/Detail.vue')
};
const admin = {
  Home:() => import("@/views/admin/Home.vue"),
};
export { Login, NotFound, buyer, seller, admin };
