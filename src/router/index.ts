/*
 * @Date: 2023-12-05 16:17:11
 * @LastEditTime: 2023-12-27 14:03:55
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
import { ElMessage } from "element-plus";

import { Login, NotFound, buyer, seller, admin } from "./constant";

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

  {
    name: "404",
    path: "/:pathMatch(.*)*",
    meta: {
      title: "404",
    },
    component: NotFound,
  },
];

export const userRoutes: Array<RouteRecordRaw> = [
  {
    name: "layout",
    path: "/home",
    meta: {
      title: "首页",
    },
    component: () => import("@/views/buyer/Layout.vue"),
    children: [
      {
        name: "home",
        path: "/home",
        meta: {
          title: "首页",
        },
        component: buyer.Home,
      },
      {
        name: "detail",
        path: "/detail",
        meta: {
          title: "详情",
        },
        component: buyer.Detail,
      },
    ],
  },
];
export const sellerRoutes: Array<RouteRecordRaw> = [
  {
    name: "layout",
    path: "/home",
    meta: {
      title: "首页",
    },
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: seller.Home,
        meta: { icon: "" },
      },
      {
        name: "detail",
        path: "/detail",
        meta: {
          title: "详情",
          icon: "",
        },
        component: seller.Detail,
      },
    ],
  },
];
export const adminRoutes: Array<RouteRecordRaw> = [
  {
    name: "home",
    path: "/home",
    meta: {
      title: "首页",
    },
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: admin.Home,
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
const whiteList = ["/login"];
NProgress.configure({ showSpinner: false }); //进度环显示/隐藏

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const loginStore = useLoginStore();
  const { role, token } = storeToRefs(loginStore);
  if (loginStore.isAuthenticated()) {
    console.log(to, router, "to");
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    }
    if (router.getRoutes().length < 4) {
      loginStore.SET_ROUTES();
      /* 原本我写的是next(to)但会有bug：登录成功后跳转的是404，在浏览器输入/login或/detail才能跳到响应页面，而且每次刷新浏览器都会跳到404，但是浏览器前进后退都可以正常显示
      我改为to.path解决的问题是刷新浏览器后能正常显示，现在还存留一个bug:登录后跳转到的是404 */
      next(to.path);
    } else {
      next();
    }
  } else {
    ElMessage.error("登录超时，请重新登录！");
    loginStore.CLEAR_STORAGE();
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
