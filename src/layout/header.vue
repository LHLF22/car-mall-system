<!--
 * @Date: 2023-12-19 15:04:49
 * @LastEditTime: 2023-12-28 17:23:35
 * @FilePath: \car-mall-system\src\layout\header.vue
 * @Description: 
-->
<template>
  <div class="header flSB">
    <logo></logo>
    <div class="fl">
      <elcolor-toggle></elcolor-toggle>
      <login-out></login-out>
    </div>
  </div>
</template>

<script setup lang="ts">
import elcolorToggle from "../base-ui/elcolor-toggle.vue";
import logo from "../components/seller-layout/logo.vue";
import loginOut from "../components/seller-layout/login-out.vue";
</script>

<style scoped lang="scss">
.header {
  height: 100%;
}
</style>
