<!--
 * @Date: 2023-12-28 14:48:06
 * @LastEditTime: 2024-02-05 16:23:06
 * @FilePath: \car-mall-system\src\views\buyer\Category.vue
 * @Description: 编写 次要分类标签页 的页面
-->
<template>
  <div class="Category">
    <!-- <HeaderSecond>
      <template #title>
        {{ title }}
      </template>
      <template #desc> haha </template>
    </HeaderSecond> -->
    <!-- <el-tabs
      v-model="buyerLayoutStore.activeName"
    >
      <el-tab-pane
        v-for="item in categories"
        :key="item.id"
        :label="item.name"
        :name="item.name"
        >{{ item.name }}</el-tab-pane
      >
    </el-tabs> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getCurrentInstance, ComponentInternalInstance } from "vue";
import HeaderSecond from "../../components/buyer/layout/header.vue";
import useBuyerLayoutStore from "../../store/buyer-layout";
const { proxy }: ComponentInternalInstance = getCurrentInstance();
const route = useRoute();
const buyerLayoutStore = useBuyerLayoutStore();

//获取页面的主要分类：车身类型
/* const title = ref<string>("");
proxy.$buyerApi.category
  .getCarCategory({ id: parseInt(route.params.id as string) })
  .then((res) => {
    title.value = res.data.name;
  }); */

//获取主要分类下的次要分类
/* const categories = ref<any[]>([]);
proxy.$buyerApi.category
  .getCategoryNameAll({ id: parseInt(route.params.id as string) })
  .then((res) => {
    categories.value = res.data;
  }); */


</script>

<style scoped lang="scss"></style>
