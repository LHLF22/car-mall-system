<!--
 * @Date: 2024-03-11 14:23:47
 * @LastEditTime: 2024-03-11 15:32:11
 * @FilePath: \car-mall-system\src\components\buyer\person\MyFavor.vue
 * @Description: 
-->
<template>
  <div class="MyFavor">
    <div v-if="buyerLayoutStore.favorList.length > 0">
      <div v-for="favor in buyerLayoutStore.favorList" :key="favor.id">
        <div class="flex">
            <img style="width: 100px" :src="favor.carInfo.images[0].url" alt="" />
            <div>
              <span>{{ favor.carInfo.name }}</span>
              <div>单价：￥{{ favor.carInfo.price }}</div>
              <el-icon @click="cancelFavor(favor)"><StarFilled/></el-icon>
            </div>
          </div>
      </div>
    </div>
    <div v-else>
      <el-empty description="暂无收藏列表" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {  ref } from "vue";
import useBuyerLayoutStore from "@/store/buyer-layout";
import { ElMessage, ElMessageBox } from "element-plus";
const buyerLayoutStore = useBuyerLayoutStore();
buyerLayoutStore.getFavorList();
const cancelFavor=(favor)=>{
  ElMessageBox.confirm(
    '确认取消收藏吗?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      proxy.$buyerApi.person.deleteFavor({carId:favor.carInfo.id,sellerId:favor.carInfo.sellerId}).then((res) => {
      if(res.code==0){
        buyerLayoutStore.getFavorList();
      }else{
        ElMessage.error('取消收藏失败')
      }
    })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}
</script>

<style scoped lang="scss"></style>

