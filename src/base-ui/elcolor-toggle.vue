<!--
 * @Date: 2023-12-08 17:14:10
 * @LastEditTime: 2023-12-20 10:05:28
 * @FilePath: \car-mall-system\src\components\elcolor-toggle.vue
 * @Description: el组件默认颜色设置
-->

<template>
  <div class="elcolor-toggle">
    <el-color-picker v-model="layoutStore.defaultTheme" @change="changeTheme" />
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useElementPlusTheme } from "use-element-plus-theme";
import useLayoutStore from "../store/layout";
const layoutStore = useLayoutStore();
const { changeTheme } = useElementPlusTheme(layoutStore.defaultTheme);
//TODO:这样写正确吗
watch(
  () => layoutStore.defaultTheme,
  () => {
    layoutStore.defaultTheme = layoutStore.defaultTheme;
  }
);
</script>
<style scoped lang="scss"></style>
