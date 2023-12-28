<!--
 * @Date: 2023-12-28 14:37:10
 * @LastEditTime: 2023-12-28 14:37:15
 * @FilePath: \car-mall-system\src\views\buyer\Concret.vue
 * @Description: 
-->
<template>
  <div class="Concret">
    <h2>Concret:{{route.params.id}}</h2>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute()
</script>

<style scoped lang="scss"></style>
