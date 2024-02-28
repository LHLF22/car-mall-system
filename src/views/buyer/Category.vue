<!--
 * @Date: 2023-12-28 14:48:06
 * @LastEditTime: 2024-02-28 17:12:10
 * @FilePath: \car-mall-system\src\views\buyer\Category.vue
 * @Description: 编写 次要分类标签页 的页面
-->
<template>
  <div class="Category">
    <car-item />
    <div>{{ tags }}</div>
  </div>
</template>

<script setup lang="ts">
import CarItem from "../../components/buyer/category/car-item.vue";
import { getCurrentInstance, ComponentInternalInstance } from "vue";
import useBuyerLayoutStore from "../../store/buyer-layout";
import { ref,watch, watchEffect } from "vue";
import { computed } from "vue";
const { proxy }: ComponentInternalInstance = getCurrentInstance();
const buyerLayoutStore = useBuyerLayoutStore();
const tags=ref<string[]>([])
watchEffect(() => {
  console.log(buyerLayoutStore.tags, "tags");
  tags.value=buyerLayoutStore.tags
  
});

</script>

<style scoped lang="scss"></style>
