/*
 * @Date: 2023-12-06 17:39:14
 * @LastEditTime: 2023-12-12 15:16:43
 * @FilePath: \car-mall-system\src\router\constant.ts
 * @Description: 全局路由懒加载文件
 */
// export const Home = () => import('@/layout/index.vue')
const Login = () => import("@/views/Login.vue");
const NotFound = () => import("@/views/404.vue");
const user = {
  Home: () => import("@/views/user/Home.vue"),
  Detail:()=>import("@/views/user/Detail.vue")
};
const seller={

}
const admin={
  
}
export { Login, NotFound, user,seller,admin };
