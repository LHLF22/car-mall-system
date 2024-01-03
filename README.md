<!--
 * @Date: 2023-12-05 14:35:51
 * @LastEditTime: 2023-12-29 17:33:43
 * @FilePath: \car-mall-system\README.md
 * @Description:bug和逻辑
-->

1.shims-vue.d.ts 中用于扩展全局声明，包括自定义的$api 这些
2.遇到一个问题，路由守卫中，刷新浏览器，会跳到 404，但浏览器的前进后退会正常显示。
3.componnet/login-or-register-panel 中有个大坑，我函数 handleGetCode 中的 phone 验证通过了，但是回调函数一直没能执行，原来是自定义验证规则时没有 else，const validatePhone 时
4.关于挂在$api 在 app 全局对象上：1.需要在 main.ts 中挂载 2.为了有 ts 类型检测，需要在 shims.vue.d.ts 文件上对 runtime-core.d.ts 文件中的 ComponentCustomProperties 接口进行扩展 5.可以在 onMounted 再使用 watchEffect 6.在 Vue 3 中，getCurrentInstance()函数只能在组件的 setup 函数中调用，而不能在定义 store 的地方（如 defineStore）中调用。所以要在 defineStore 中使用 api 方法，直接 import userApi from "../api/user";然后 const res=await userApi.login(params) 7.我的注册逻辑：先判断 code 是不是为 0，不为 0 的话判断是否正确，正确的话就进行注册，注册成功的话跳转到登录页面 8.我怎么实现买家与卖家和管理员系统不同的：通过在 router/index 中定义的各自的 routes，sellerRoutes 和 adminRoutes 是 layout 的嵌套路由
