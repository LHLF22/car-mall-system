<!--
 * @Date: 2023-12-28 14:48:06
 * @LastEditTime: 2024-01-03 17:42:49
 * @FilePath: \car-mall-system\src\views\buyer\Category.vue
 * @Description: 
-->
<template>
  <div class="Category">
    <div>{{ title }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getCurrentInstance, ComponentInternalInstance } from "vue";

const route = useRoute();
const { proxy }: ComponentInternalInstance = getCurrentInstance();

const title = ref<string>("");
proxy.$buyerApi.category
  .getCarCategory({ id: parseInt(route.params.id as string) })
  .then((res) => {
    title.value = res.data.name;
  });
</script>

<style scoped lang="scss"></style>
