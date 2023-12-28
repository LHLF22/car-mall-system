<template>
  <el-avatar class="avatar">{{ loginStore.userInfo.account[0] }}</el-avatar>
</template>
<script setup lang="ts">
import useLoginStore from "../store/login";
const loginStore = useLoginStore();
</script>
<style scoped lang="scss">
.avatar{
  background-color: var(--el-color-primary);
}
</style>
