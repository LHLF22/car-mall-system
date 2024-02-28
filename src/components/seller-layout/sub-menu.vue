<!--
 * @Date: 2023-12-19 16:19:51
 * @LastEditTime: 2024-02-21 11:35:27
 * @FilePath: \car-mall-system\src\components\seller-layout\sub-menu.vue
 * @Description: 
-->
<template>
  <el-sub-menu :index="menu.name" v-if="menu.children">
    <template #title>
      <el-icon v-if="menu.meta.icon"><component :is="menu.meta.icon" /></el-icon>
      <span>{{ menu.meta.title }}</span>
    </template>
    <!-- 多级嵌套菜单 -->
    <sub-menu
      v-for="menuItem in menu.children"
      :menu="menuItem"
      :key="menuItem.name"
    ></sub-menu>
  </el-sub-menu>
  <el-menu-item @click="layoutStore.addBread(menu)" :index="menu.name" v-else>
    <el-icon  v-if="menu.meta.icon"><component :is="menu.meta.icon" /></el-icon>
    <template #title>{{ menu.meta.title }}</template>
  </el-menu-item>
</template>

<script setup lang="ts">
import useLayoutStore from "../../store/layout";
import { RouteRecordRaw } from "vue-router";
defineProps<{ menu: RouteRecordRaw }>();
const layoutStore = useLayoutStore();
</script>

<style scoped lang="scss"></style>
