/*
 * @Date: 2023-12-08 15:08:46
 * @LastEditTime: 2023-12-26 09:32:00
 * @FilePath: \car-mall-system\src\store\login.ts
 * @Description:
 */
import { defineStore } from "pinia";
import { useRouter, RouteRecordRaw } from "vue-router";
import userApi from "../api/user";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  routes,
  userRoutes,
  sellerRoutes,
  adminRoutes,
  router,
} from "../router";
import { ref } from "vue";
// import useLayoutStore from "./layout";
// const { proxy }: ComponentInternalInstance = getCurrentInstance();

const useLoginStore = defineStore(
  "login",
  () => {
    const router = useRouter();
    // const layoutStore=useLayoutStore()
    /*  if(getCurrentInstance()){
    } */
    let role = ref("");
    let token = ref("");
    let userInfo = ref<{
      account?: string;
      id?: number;
      role?: string;
      gender?: string 
      introduction?:string
      password?:string
    }>({});
      
    // let isAuthenticated=ref<boolean>(false)

    function SET_ROLE(roleData = "") {
      role.value = roleData;
      localStorage.setItem("role", roleData);
    }
    function SET_TOKEN(tokenData = "") {
      token.value = tokenData;
      localStorage.setItem("token", tokenData);
    }
    function SET_USERINFO(userinfoData = {}) {
      userInfo.value = userinfoData;
      localStorage.setItem("userInfo", JSON.stringify(userinfoData));
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

    let myRoutes = ref<RouteRecordRaw[]>(routes);

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
      // router.addRoute({
      //   name: "404",
      //   path: "/:pathMatch(.*)*",
      //   meta: {
      //     title: "404",
      //   },
      //   component: () => import("@/views/404.vue"),
      // });
      localStorage.setItem("routes", JSON.stringify(router.getRoutes()));
      myRoutes.value = router.getRoutes();
      // console.log(router.getRoutes(),'myRoutes')
      return new Promise((resolve, reject) => {
        resolve(myRoutes.value);
      });
    }
    /* 重置路由 */
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
      SET_USERINFO();
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
      const res = await userApi.login(params);
      if (res.code === 0) {
        router.replace("/home");
        // layoutStore.initBread()
        SET_ROLE(res.data.role);
        SET_TOKEN(res.data.token);
        SET_USERINFO(res.data.userInfo);
        SET_ROUTES();
      }
    }
    /* 退出登录 */
    function loginOut() {
      localStorage.clear();
      ElMessageBox.confirm("是否退出登录?", "Warning", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          router.replace("/login");
          ElMessage({
            type: "success",
            message: "退出成功",
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消退出",
          });
        });
    }
    return {
      role,
      token,
      userInfo,
      isAuthenticated,
      myRoutes,
      loginAction,
      SET_ROLE,
      SET_TOKEN,
      SET_USERINFO,
      // SET_AUTHENTICATED,
      CLEAR_STORAGE,
      SET_ROUTES,
      RESET_ROUTES,
      loginOut,
    };
  },
  { persist: true }
);

export default useLoginStore;
