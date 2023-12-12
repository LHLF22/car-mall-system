<!--
 * @Date: 2023-12-08 17:14:10
 * @LastEditTime: 2023-12-08 17:17:35
 * @FilePath: \car-mall-system\src\components\elcolor-toggle.vue
 * @Description: el组件默认颜色设置
-->

<template>
  <div class="elcolor-toggle">
    <el-color-picker v-model="defaultTheme" @change="changeTheme" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useElementPlusTheme } from "use-element-plus-theme";
const defaultTheme = ref("#405DFF");
const { changeTheme } = useElementPlusTheme(defaultTheme.value);
</script>
<style scoped lang="less"></style>
