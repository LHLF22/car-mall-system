<!--
 * @Date: 2023-12-27 12:00:38
 * @LastEditTime: 2023-12-28 16:22:20
 * @FilePath: \car-mall-system\src\views\buyer\Layout.vue
 * @Description: 买家平台的layout布局
-->
<template>
  <div class="Home">
    <el-container class="wrapper">
      <el-aside
        class="animate-menu"
        :width="layoutStore.isOpen ? '90px' : '300px'"
      >
        <layoutAside></layoutAside>
        <elcolor-toggle></elcolor-toggle>
      </el-aside>
      <el-main>
        <!-- 中间的 嵌套路由-->
        <router-view v-slot="{ Component, route }">
          <transition name="fade-transform" mode="out-in">
            <keep-alive>
              <component :is="Component" :key="route.path" />
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import useLayoutStore from "../../store/layout";
import layoutAside from "../../components/buyer/layout/layout-aside.vue";
import elcolorToggle from "../../base-ui/elcolor-toggle.vue";
const layoutStore = useLayoutStore();
</script>
<style scoped lang="scss">
.el-container.wrapper {
  height: 100vh;
}
.el-aside {
  border-right: 1px solid #ccc;
  padding: 25px 15px;
  overflow: visible;
  background-color: var(--el-color-error-light-8);
}
.el-main {
  height: 100vh;
  overflow-y: auto;
  @include scrollbar();
  background-color: var(--el-color-error-light-9);
}
</style>
