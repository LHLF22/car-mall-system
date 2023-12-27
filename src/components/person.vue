<!--
 * @Date: 2023-12-19 17:56:27
 * @LastEditTime: 2023-12-19 17:57:32
 * @FilePath: \car-mall-system\src\components\person.vue
 * @Description: 
-->
<template>
  <div class="person">
    <el-icon><User /></el-icon>
    <span>{{ loginStore.userInfo.account }}</span>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from "../store/login";
const loginStore = useLoginStore();
</script>

<style scoped lang="scss"></style>
