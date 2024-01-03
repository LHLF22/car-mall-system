<!--
 * @Date: 2023-12-28 17:20:41
 * @LastEditTime: 2023-12-29 09:55:03
 * @FilePath: \car-mall-system\src\components\seller-layout\breadcrumb.vue
 * @Description: 
-->
<template>
  <el-breadcrumb separator=" ">
    <el-breadcrumb-item v-for="item in layoutStore.myBread" :key="item.path"
      ><el-tag
      class="tag"
        @click="router.push(item.path)"
        :effect="route.path === item.path ? 'dark' : 'plain'"
        :closable="layoutStore.myBread.indexOf(item)!==0"
        @close="layoutStore.removeBread(item)"
        :to="{ path: item.path }"
        >{{ item.meta.title }}</el-tag
      ></el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayoutStore from "../../store/layout";
const layoutStore = useLayoutStore();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
</script>

<style scoped lang="scss">
.tag{
  transition: background-color 0.1s linear;
}
</style>
