<!--
 * @Date: 2023-12-28 14:48:06
 * @LastEditTime: 2024-03-11 21:51:38
 * @FilePath: \car-mall-system\src\views\buyer\Category.vue
 * @Description: 编写 次要分类标签页 的页面
-->
<template>
  <div class="Category">
    <div class="f" v-if="carItems.length > 0">
      <car-item
        @favor-change="tagsChanges"
        v-for="item in carItems"
        :key="item.id"
        :car-data="item"
      />
    </div>
    <div v-else class="fl else-div">
      <el-empty class="else-div" description="暂无数据" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CarItem from "../../components/buyer/category/car-item.vue";
import {
  getCurrentInstance,
  ComponentInternalInstance,
  ref,
  watchEffect,
} from "vue";
import useBuyerLayoutStore from "../../store/buyer-layout";
const { proxy }: ComponentInternalInstance = getCurrentInstance();
const buyerLayoutStore = useBuyerLayoutStore();
const tags = ref<{ name: string; tag: string }[]>([]);
const carItems = ref<any[]>([]);
const tagsChanges = () => {
  tags.value = buyerLayoutStore.tags;
  if (tags.value.length !== 0) {
    proxy.$buyerApi.category.getCarSpecial(tags.value).then((res) => {
      if (res.code == 0) {
        carItems.value = res.data;
      } else {
        carItems.value = [];
      }
    });
  } else {
    carItems.value = [];
  }
};
watchEffect(tagsChanges);
</script>

<style scoped lang="scss">
.else-div {
  width: 100%;
  height: 100%;
}
</style>
