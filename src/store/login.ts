/*
 * @Date: 2023-12-08 15:08:46
 * @LastEditTime: 2023-12-14 14:26:05
 * @FilePath: \car-mall-system\src\store\login.ts
 * @Description:
 */
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import {
  routes,
  userRoutes,
  sellerRoutes,
  adminRoutes,
  router,
} from "../router";
import { RouteRecordRaw } from "vue-router";
import { resolve } from "path";
// import { getCurrentInstance, ComponentInternalInstance } from "vue";
// const { proxy }: ComponentInternalInstance = getCurrentInstance();

const useLoginStore = defineStore(
  "login",
  () => {
    const router = useRouter();
    let role = ref("");
    let token = ref("");
    // let isAuthenticated=ref<boolean>(false)
    let myRoutes = ref<RouteRecordRaw[]>(routes);
    function SET_ROLE(roleData = "") {
      role.value = roleData;
      localStorage.setItem("role", roleData);
    }
    function SET_TOKEN(tokenData = "") {
      token.value = tokenData;
      localStorage.setItem("token", tokenData);
    }
    // 设置是否通过验证
    function isAuthenticated() {
      let flag =
        localStorage.getItem("token") &&
        localStorage.getItem("role") &&
        JSON.parse(localStorage.getItem("routes")).length > 3
          ? true
          : false;
      localStorage.setItem("isAuthenticated", JSON.stringify(flag));
      return flag;
    }
    //登录成功时，TODO:
    function SET_ROUTES() {
      let addRoutes: RouteRecordRaw[] = [];
      if (role.value === "buyer") {
        addRoutes = userRoutes;
      } else if (role.value === "seller") {
        addRoutes = sellerRoutes;
      } else if (role.value === "admin") {
        addRoutes = adminRoutes;
      } else {
        addRoutes = [];
      }
      RESET_ROUTES();
      addRoutes.forEach((route: RouteRecordRaw) => {
        router.addRoute(route);
      });
      router.addRoute({
        name: "404",
        path: "/:pathMatch(.*)*",
        meta: {
          title: "404",
        },
        component: () => import("@/views/404.vue"),
      });
      localStorage.setItem("routes", JSON.stringify(router.getRoutes()));
      myRoutes.value = router.getRoutes();
      // console.log(router.getRoutes(),'myRoutes')
      return new Promise((resolve, reject) => {
        resolve(myRoutes.value);
      });
    }
    function RESET_ROUTES() {
      const currentRoutes = router.getRoutes();
      currentRoutes.forEach((route) => {
        if (
          route.name !== "404" &&
          route.name !== "login" &&
          route.name !== "/"
        ) {
          //console.log(route.name,'??')
          // 保留 NotFound 路由
          router.removeRoute(route.name as string);
        }
      });
    }
    //清空缓存
    function CLEAR_STORAGE() {
      SET_ROLE();
      SET_TOKEN();
      // SET_AUTHENTICATED()
      RESET_ROUTES();
    }
    /*  function REMOVE_ROLE(){
      role.value=''
      localStorage.removeItem('role')
    }
    function REMOVE_TOKEN(){
      token.value=''
      localStorage.removeItem('token')
    } */
    async function loginAction(params) {
      // const res= await proxy.$loginRegisterApi.login.login(params)
      // if(res.code==200){
      //跳转路由，localStorage，
      // }
      /* const random = Math.random() * 100;
      setTimeout(() => {
        if (random > 2) {
          //跳转路由
          // SET_AUTHENTICATED(true)
          SET_TOKEN("hdfafuiebuwfaiefuifbwa");
          SET_ROLE("buyer");
          SET_ROUTES(); //TODO:
          router.push("/home");
        } else {
          //登录失败
          // ElMessage.error("出错啦");
        }
      }, 2000); */
      
    }
    return {
      role,
      token,
      isAuthenticated,
      myRoutes,
      loginAction,
      SET_ROLE,
      SET_TOKEN,
      // SET_AUTHENTICATED,
      CLEAR_STORAGE,
      SET_ROUTES,
      RESET_ROUTES,
    };
  },
  { persist: true }
);

export default useLoginStore;
