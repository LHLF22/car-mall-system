<template>
  <el-affix>
    <div  class="page-header f">
      <span><slot name="title"></slot></span>
      <div><slot name="desc"></slot></div>
    </div>
  </el-affix>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.page-header {
  padding:10px 0;
  background-color: var(--el-color-error-light-9);
  /* margin: -20px -20px 0; */
}
</style>
