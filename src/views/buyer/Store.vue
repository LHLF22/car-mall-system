<!--
 * @Date: 2024-03-11 13:43:07
 * @LastEditTime: 2024-03-11 14:15:14
 * @FilePath: \car-mall-system\src\views\buyer\Store.vue
 * @Description: 
-->
<template>
  <div class="Store">
    <el-page-header @back="router.go(-1)">
      <template #content>
        <div>
          <span> {{ storeInfo.name }} </span>
        </div>
      </template>

      <el-descriptions :column="1" size="small">
        <el-descriptions-item label="店铺成立"
          >{{
            dayjs().diff(storeInfo.createdAt, "day")
          }}天了</el-descriptions-item
        >
        <el-descriptions-item label="店铺描述：">{{
          storeInfo.desc
        }}</el-descriptions-item>
        <el-descriptions-item label="店铺联系方式">{{
          storeInfo.phone
        }}</el-descriptions-item>
        <el-descriptions-item label="店铺地址"
          >{{
            storeInfo.province
              ? storeInfo.province.join("") + storeInfo.detailAddress
              : storeInfo.province + storeInfo.detailAddress
          }}
        </el-descriptions-item>
      </el-descriptions>
    </el-page-header>
    <div class="flex" v-if="allCars.length > 0">
      <car-item v-for="item in allCars" :key="item.id" :car-data="item" />
    </div>
    <div v-else class="fl else-div">
      <el-empty class="else-div" description="暂无数据" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CarItem from "../../components/buyer/category/car-item.vue";
import { useRoute, useRouter } from "vue-router";
import {
  ref,
  watchEffect,
  getCurrentInstance,
  ComponentInternalInstance,
} from "vue";
import dayjs from "dayjs";

const { proxy }: ComponentInternalInstance = getCurrentInstance();
const route = useRoute();
const router = useRouter();
const storeInfo = ref({});
const allCars = ref<any[]>([]);
proxy.$sellerApi.store.getStoreInfo(route.params.id).then((res) => {
  if (res.code == 0) {
    storeInfo.value = res.data;
  }
});
proxy.$sellerApi.shop.getAllCarDeail(route.params.id).then((res) => {
  if (res.code == 0) {
    allCars.value = res.data;
  }
});
</script>

<style scoped lang="scss">
:deep(.el-descriptions__body) {
  background-color: var(--el-color-error-light-8);
}
</style>
