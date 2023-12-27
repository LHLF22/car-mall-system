<!--
 * @Date: 2023-12-19 16:19:51
 * @LastEditTime: 2023-12-19 16:30:09
 * @FilePath: \car-mall-system\src\components\sub-menu.vue
 * @Description: 
-->
<template>
  <el-sub-menu :index="menu.name" v-if="menu.children">
    <template #title>
      <el-icon><icon-menu /></el-icon>
      <span>{{ menu.name }}</span>
    </template>
    <!-- 多级嵌套菜单 -->
    <sub-menu
      v-for="menuItem in menu.children"
      :menu="menuItem"
      :key="menuItem.name"
    ></sub-menu>
  </el-sub-menu>
  <el-menu-item :index="menu.name" v-else>
    <el-icon><icon-menu /></el-icon>
    <template #title>{{ menu.name }}</template>
  </el-menu-item>
</template>

<script setup lang="ts">
import { Menu as IconMenu, Location, Setting } from "@element-plus/icons-vue";
import { RouteRecordRaw } from "vue-router";
defineProps<{ menu: RouteRecordRaw }>();
</script>

<style scoped lang="scss"></style>
