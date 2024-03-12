<!--
 * @Date: 2023-12-08 15:28:55
 * @LastEditTime: 2024-03-11 21:52:46
 * @FilePath: \car-mall-system\src\views\buyer\Home.vue
 * @Description: 
-->
<template>
  <div>
    <div style="height: 250px" class="fl">
      <div>{{ `${account}${currentTime}` }}，欢迎来到汽车商城系统</div>
      <div>
        <el-input
          v-model="searchInfo"
          size="large"
          placeholder="Please Input"
          :prefix-icon="Search"
          :clearable="true"
          @keyup.enter="handleSearch"
        />
      </div>
    </div>
    <div v-if="!searchRes">
      <div>全部汽车</div>
      <div class="flex">
        <car-item
          @favor-change="buyerLayoutStore.getAllCar()"
          v-for="item in buyerLayoutStore.allCar"
          :key="item.id"
          :car-data="item"
        />
      </div>
    </div>
    <div v-else>
       <car-item
          @favor-change="getSearchRes"
          v-for="item in searchRes"
          :key="item.id"
          :car-data="item"
        />
    </div>
    <!-- 搜索出来的汽车与全部汽车通过动态组件替换 -->
  </div>
</template>

<script setup lang="ts">
import useBuyerLayoutStore from "../../store/buyer-layout";
import CarItem from "../../components/buyer/category/car-item.vue";
import {
  ref,
  onMounted,
  getCurrentInstance,
  ComponentInternalInstance,
} from "vue";
import { Search } from "@element-plus/icons-vue";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
const { proxy }: ComponentInternalInstance = getCurrentInstance();
dayjs.extend(customParseFormat);
const now = dayjs(); // 获取当前时间
const morningStart = dayjs("06:00", "HH:mm"); // 早上开始时间
const afternoonStart = dayjs("12:00", "HH:mm"); // 下午开始时间
const eveningStart = dayjs("18:00", "HH:mm"); // 晚上开始时间
const currentTime = ref("早上好");
onMounted(() => {
  if (now.isAfter(eveningStart)) {
    currentTime.value = "晚上好";
  } else if (now.isAfter(afternoonStart)) {
    currentTime.value = "下午好";
  } else if (now.isAfter(morningStart)) {
    currentTime.value = "早上好";
  } else {
    currentTime.value = "凌晨好";
  }
});
const buyerLayoutStore = useBuyerLayoutStore();
buyerLayoutStore.getAllCar();
const account = JSON.parse(localStorage.getItem("userInfo")).account;
const searchInfo = ref("");
const searchRes=ref(null)
const getSearchRes=()=>{
  proxy.$buyerApi.home.getSpecialCar(searchInfo.value).then((res) => {
    if (res.code == 0) {
      searchRes.value = res.data;
    } else {
      searchRes.value = [];
    }
  });
}
const handleSearch = () => {
  if (!searchInfo.value.trim()) return;
  console.log(searchInfo.value);
  getSearchRes()
};
</script>

<style scoped lang="scss"></style>
