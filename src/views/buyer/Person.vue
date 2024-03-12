<!--
 * @Date: 2023-12-28 10:54:43
 * @LastEditTime: 2024-03-12 10:01:16
 * @FilePath: \car-mall-system\src\views\buyer\Person.vue
 * @Description: 
-->
<template>
  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="收藏列表" name="forth"><my-favor/></el-tab-pane>
    <el-tab-pane label="购物车" name="first"><my-shop-cart/></el-tab-pane>
    <el-tab-pane label="订单" name="second"><my-order/></el-tab-pane>
    <el-tab-pane label="退款与售后" name="third"><my-after-sale/></el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import MyShopCart from "@/components/buyer/person/MyShopCart.vue";
import MyOrder from "@/components/buyer/person/MyOrder.vue";
import MyAfterSale from "@/components/buyer/person/MyAfterSale.vue";
import MyFavor from "@/components/buyer/person/MyFavor.vue";
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";

const activeName = ref("first");
</script>

<style scoped lang="scss"></style>

