/*
 * @Date: 2023-12-07 10:03:12
 * @LastEditTime: 2023-12-11 15:11:05
 * @FilePath: \car-mall-system\src\shims-vue.d.ts
 * @Description:
 * 解决：
 * 1.找不到模块“./App.vue”或其相应的类型声明。
 * 2.扩展vue全局对象上的 $api
 */

/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

import  userApi  from "./api/user";
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $userApi: typeof userApi;
  }
}

import loginRegisterApi from "./api/login-register";
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $loginRegisterApi: typeof loginRegisterApi;
  }
}
