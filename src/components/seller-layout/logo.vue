<!--
 * @Date: 2023-12-20 10:39:46
 * @LastEditTime: 2023-12-26 16:16:45
 * @FilePath: \car-mall-system\src\components\layout-header\logo.vue
 * @Description: 
-->
<template>
  <div class="logo flSB">
    <el-text type="primary" class="p10 logo-text"
      >{{ loginStore.role === "seller" ? "商家" : "管理员" }}后台管理系统</el-text
    >
    <expand-fold :is-text="true"></expand-fold>
   <!--  <el-button @click="layoutStore.changeOpen"
      ><el-icon><component :is="iconComponent"></component></el-icon
    ></el-button> -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import useLoginStore from "../../store/login";
import expandFold from "../../base-ui/expand-fold.vue";
/* import useLayoutStore from "../../store/layout";
import { Expand, Fold } from "@element-plus/icons-vue"; */
const loginStore = useLoginStore();
/* 控制侧栏折叠 */
//折叠开关图标
/* const iconComponent = ref(Expand);
const layoutStore = useLayoutStore();
watch(
  () => layoutStore.isOpen,
  (newVal) => {
    iconComponent.value = newVal ? Expand : Fold;
  }
); */
</script>

<style scoped lang="scss">
.logo-text {
  font-size: 20px;
  /* font-weight: 600; */
  /* color:hotpink; */
}
</style>
