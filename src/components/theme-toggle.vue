<!--
 * @Date: 2023-12-08 17:11:24
 * @LastEditTime: 2023-12-19 17:46:56
 * @FilePath: \car-mall-system\src\components\theme-toggle.vue
 * @Description: 主题切换
-->
<template>
  <div class="theme-list">
    <!-- <p>亮色<el-divider direction="vertical" />暗黑</p> -->
    <el-switch
      v-model="themeConfig.isDark"
      inline-prompt
      active-icon="Sunny"
      inactive-icon="Moon"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
// 1. 引入useDark
import { useDark } from "@vueuse/core";

// 2. 使用useDark
const isDark = useDark();

// 3. 主题配置
const themeConfig = reactive({
  isDark: isDark,
});
</script>

<style scoped lang="scss"></style>
