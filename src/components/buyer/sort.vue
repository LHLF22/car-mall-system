<!--
 * @Date: 2023-12-26 15:15:42
 * @LastEditTime: 2023-12-27 11:44:07
 * @FilePath: \car-mall-system\src\components\buyer\sort.vue
 * @Description: 
-->
<template>
  <div class="sort flex">
    <!-- <el-tooltip
      effect="dark"
      :content="props.text"
      placement="bottom"
      :hide-after="0"
    >
      <el-button text>
        <el-icon><component :is="props.icon"></component></el-icon
      ></el-button>
    </el-tooltip> -->

    <el-button text>
      <el-icon><component :is="props.icon"></component></el-icon
    ></el-button>
    <el-text size="small">{{ props.text }} :</el-text>

    <div v-for="(item, index) in props.list" :key="(item as string)">
      <el-button size="small" type="primary" text>{{ item }}</el-button
      ><span class="divider" v-if="index !== list.length - 1">/</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  list: {
    type: Array,
  },
  text: {
    type: String,
  },
  icon: {
    type: String,
  },
});
</script>

<style scoped lang="scss">
.sort {
  margin: 8px 0;
}
</style>
