/*
 * @Date: 2023-12-05 16:17:11
 * @LastEditTime: 2023-12-12 17:18:34
 * @FilePath: \car-mall-system\src\router\index.ts
 * @Description:
 */
// router/index.ts
import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import useLoginStore from "../store/login";
import { storeToRefs } from "pinia";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { Login, NotFound, user, seller, admin } from "./constant";
const whiteList = ["/login"];
export const routes: Array<RouteRecordRaw> = [
  {
    name: "/",
    path: "/",
    redirect: "/home",
  },
  {
    name: "login",
    path: "/login",
    meta: {
      title: "登录",
    },
    component: Login,
  },
  // 页面不存在时的路由

  /* {
    name: "404",
    path: "/:pathMatch(.*)*",
    meta: {
      title: "404",
    },
    component: NotFound,
  }, */
];

export const userRoutes: Array<RouteRecordRaw> = [
  {
    name: "home",
    path: "/home",
    meta: {
      title: "首页",
    },
    component: user.Home,
  },
  {
    name: "detail",
    path: "/detail",
    meta: {
      title: "详情",
    },
    component: user.Detail,
  },
];
export const sellerRoutes: Array<RouteRecordRaw> = [];
export const adminRoutes: Array<RouteRecordRaw> = [];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

NProgress.configure({ showSpinner: false }); //进度环显示/隐藏

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const loginStore = useLoginStore();
  const { role,token } = storeToRefs(loginStore);
  if (loginStore.isAuthenticated()) {
    await loginStore.SET_ROUTES();
    console.log(to,router,'to')
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      // next({...to,replace:true})
      next();
    }
  } else {
    //2.没有token的话可以访问白名单页面（登录页面）
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      // 未登录但要去的不是白名单页面-----让他到登录页面，然后再重定向到要去的页面
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
  return true;
});
// 全局后置钩子
router.afterEach(async () => {
  // const loginStore = useLoginStore();
  // await router.isReady();
  // console.log(loginStore.role,'ff')
  // console.log(JSON.parse(localStorage.getItem('routes')),'fewef')
  console.log(router.getRoutes(), "hai");
  NProgress.done(true);
});
export default router;
