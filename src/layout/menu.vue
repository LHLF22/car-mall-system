<!--
 * @Date: 2023-12-19 15:04:36
 * @LastEditTime: 2023-12-28 15:23:06
 * @FilePath: \car-mall-system\src\layout\menu.vue
 * @Description: 
-->
<!--
 * @Date: 2023-12-19 15:04:36
 * @LastEditTime: 2023-12-19 16:28:30
 * @FilePath: \car-mall-system\src\layout\menu.vue
 * @Description: 
-->
<!-- @open="handleOpen"
    @close="handleClose" -->
<template>
  <el-menu
    :default-active="defaultActive"
    class="el-menu-vertical-demo"
    router
    :collapse="layoutStore.isOpen"
    :background-color="layoutStore.menuColor"
  >
    <sub-menu
      v-for="menu in asideMenu"
      :menu="menu"
      :key="menu.name"
    ></sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import subMenu from "../components/seller-layout/sub-menu.vue";
import { reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { sellerRoutes, adminRoutes } from "../router";
import { RouteRecordRaw } from "vue-router";
import useLayoutStore from "../store/layout";
const layoutStore = useLayoutStore();
/* const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
}; */

const role = localStorage.getItem("role");
const asideMenu: RouteRecordRaw[] =
  role === "seller" ? sellerRoutes[0].children : adminRoutes[0].children;
const defaultActive = computed(() => useRoute().name);
</script>

<style scoped lang="scss"></style>
