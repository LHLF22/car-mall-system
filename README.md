<!--
 * @Date: 2023-12-05 14:35:51
 * @LastEditTime: 2023-12-11 15:11:26
 * @FilePath: \car-mall-system\README.md
 * @Description:
-->

shims-vue.d.ts 中用于扩展全局声明，包括自定义的$api 这些
遇到一个问题，路由守卫中，刷新浏览器，会跳到 404，但浏览器的前进后退会正常显示。
componnet/login-or-register-panel 中有个大坑，我函数 handleGetCode 中的 phone 验证通过了，但是回调函数一直没能执行，原来是自定义验证规则时没有 else，const validatePhone 时
关于挂在$api 在 app 全局对象上：1.需要在 main.ts 中挂载 2.为了有 ts 类型检测，需要在 shims.vue.d.ts 文件上对 runtime-core.d.ts 文件中的 ComponentCustomProperties 接口进行扩展
有一个问题：我在 Login.vue 中通过 activeName 改变时调用 LoginOrRegisterPanel.vue 中的 clearForm 方法时，需要将两个表单的 v-if 改为 v-show，否则会为 undefined，因为你的 v-if 会导致另一个表完全没有渲染，所以为 undefined
