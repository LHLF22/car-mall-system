<!--
 * @Date: 2023-12-19 15:16:20
 * @LastEditTime: 2024-01-04 15:04:32
 * @FilePath: \car-mall-system\src\layout\index.vue
 * @Description: 
-->
<template>
  <el-container class="wrapper">
    <!-- 头部 -->
    <el-header class="header">
      <Header></Header>
    </el-header>
    <el-container>
      <!-- 侧栏 -->
      <el-aside
        class="animate-menu"
        :width="layoutStore.isOpen ? '64px' : '200px'"
      >
        <Menu></Menu>
      </el-aside>
      <!-- 中间main部分 -->
      <el-container>
        <el-header class="breadcrumb f">
          <!-- 面包屑 -->
          <breadcrumb/>
        </el-header>
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
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import breadcrumb from "../components/breadcrumb.vue";
import Menu from "./menu.vue";
import Header from "./header.vue";
import useLayoutStore from "../store/layout";
const layoutStore = useLayoutStore();
</script>

<style scoped lang="scss">
//蓝绿色： #B4E1DC #F4F9F9 #EAF3F3
//粉红色： #F9D6E1 #FDF7F9 #FCEFF3
//灰蓝色:  #D8E4EA #F5F8F9 #EBF2F4
.el-container.wrapper {
  height: 100vh;
}
.el-header.header {
  // background-color: #B4E1DC;
  background-color: #f9d6e1;
  height: 80px;
  // background-color: #D8E4EA;
}
.el-aside {
  // background-color: #EAF3F3;
  background-color: #fceff3;
  // background-color: #EBF2F4;
}
.el-main {
  // background-color: #F4F9F9;
  background-color: #fdf7f9;
  // background-color: #F5F8F9;
  height: 70vh;
  overflow-y: auto;
  @include scrollbar();
}
.el-header.breadcrumb {
  height: 40px;
}

</style>
<style lang="scss"></style>
