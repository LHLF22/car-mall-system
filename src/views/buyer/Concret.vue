<!--
 * @Date: 2023-12-28 14:37:10
 * @LastEditTime: 2024-01-04 15:41:34
 * @FilePath: \car-mall-system\src\views\buyer\Concret.vue
 * @Description: 这个页面暂时作废
-->
<template>
  <div class="Concret">
    <HeaderSecond>
      <template #title>
        {{ title }}
      </template>
      <template #desc> haha </template>
    </HeaderSecond>
    <div>
      <sort :data="item" v-for="item in carTypeData" :key="item.type.id"></sort>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderSecond from "../../components/buyer/layout/header.vue";
import sort from "../../components/buyer/layout/sort.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getCurrentInstance, ComponentInternalInstance } from "vue";

const route = useRoute();
const { proxy }: ComponentInternalInstance = getCurrentInstance();

const title = ref<string>("");
proxy.$buyerApi.concret
  .getCarConcret({ id: parseInt(route.params.id as string) })
  .then((res) => {
    title.value = res.data.name;
  });

let carTypeData = ref<any[]>([]);
proxy.$buyerApi.layout.getCarType().then((res) => {
  carTypeData.value = res.data;
});
</script>

<style scoped lang="scss"></style>
