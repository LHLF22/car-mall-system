/*
 * @Date: 2023-12-05 16:17:11
 * @LastEditTime: 2024-02-28 10:54:28
 * @FilePath: \car-mall-system\src\router\index.ts
 * @Description:
 */
// router/index.ts
import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import useLoginStore from "../store/login";
import useLayoutStore from "../store/layout";
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
      {
        name: "person",
        path: "/person",
        meta: {
          title: "个人中心",
        },
        component: buyer.Person,
      },
      // {
      //   name: "concret",
      //   path: "/concret/:id",
      //   meta: {
      //     title: "具体类型",
      //   },
      //   component: buyer.Concret,
      // },
      {
        name: "category",
        path: "/category",
        meta: {
          title: "具体分类",
        },
        component: buyer.Category,
      },
      {
        name: "detail",
        path: "/detail",
        meta: {
          title: "详情页",
        },
        component: buyer.CarDetail,
      },
    ],
  },
];
export const sellerRoutes: Array<RouteRecordRaw> = [
  {
    name: "layout",
    path: "/home",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: seller.Home,
        meta: { icon: "House", title: "首页" },
      },
      // {
      //   name: "detail",
      //   path: "/detail",
      //   meta: {
      //     title: "详情",
      //     icon: "Document",
      //   },
      //   component: seller.Detail,
      // },
      // {
      //   name: "person",
      //   path: "/person",
      //   meta: {
      //     title: "个人中心",
      //     icon: "Document",
      //   },
      //   component: seller.Person,
      // },
      {
        path: " ",
        name: "shop-list",
        component: seller.Shop,
        meta: {
          title: "商品管理",
          icon: "Document",
        },
        children: [
          {
            name: "shop-list",
            path: "/shop-list",
            meta: {
              title: "商品列表",
            },
            component: seller.ShopList,
          },
          // {
          //   name:'add-car',
          //   path:'/add-car',
          //   meta:{
          //     title:'添加商品'
          //   },
          //   component:seller.AddCar

          // }
        ],
      },
      {
        path: " ",
        name: "order-list",
        component: seller.Order,
        meta: {
          title: "订单管理",
          icon: "Document",
        },
        children: [
          {
            name: "order-list",
            path: "/order-list",
            meta: {
              title: "订单列表",
            },
            component: seller.OrderList,
          },
          {
            name: "after-sale",
            path: "/after-sale",
            meta: {
              title: "售后管理",
            },
            component: seller.AfterSale,
          },
        ],
      },
      {
        name: "store-manage",
        path: "/store-manage",
        meta: {
          title: "店铺管理",
          icon: "Document",
        },
        component: seller.StoreManage,
      },
    ],
  },
];
export const adminRoutes: Array<RouteRecordRaw> = [
  {
    name: "layout",
    path: "/home",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          title: "首页",
          icon: "House",
        },
        component: admin.Home,
      },
      // {
      //   name: "person",
      //   path: "/person",
      //   meta: {
      //     title: "个人中心",
      //     icon: "Document",
      //   },
      //   component: admin.Person,
      // },
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
  const layoutStore = useLayoutStore();
  layoutStore.initBread();
  const loginStore = useLoginStore();

  const { role, token } = storeToRefs(loginStore);
  if (loginStore.isAuthenticated()) {
    // console.log(to, router, "to");
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
  // console.log(router.getRoutes(), "hai");
  NProgress.done(true);
});
export default router;
