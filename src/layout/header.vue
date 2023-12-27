<!--
 * @Date: 2023-12-19 15:04:49
 * @LastEditTime: 2023-12-20 10:43:46
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
import elcolorToggle from "../components/elcolor-toggle.vue";
import logo from "../components/layout-header/logo.vue";
import loginOut from "../components/layout-header/login-out.vue";
</script>

<style scoped lang="scss">
.header {
  height: 100%;
}
</style>
