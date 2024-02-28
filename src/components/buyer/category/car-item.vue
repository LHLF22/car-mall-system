<!--
 * @Date: 2024-02-20 15:16:59
 * @LastEditTime: 2024-02-28 17:25:29
 * @FilePath: \car-mall-system\src\components\buyer\category\car-item.vue
 * @Description: 
-->
<template>
  <div class="car-item">
    <div class="fl"><img src="" /></div>
    <div class="price">￥1000.00</div>
    <div class="title">一汽-大众 CC</div>
    <el-icon><ShoppingCart /></el-icon>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.car-item {
  width: 300px;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #e5e5e5;
  .price {
    color: #e4393c;
    font-size: 20px;
  }
  .title {
    color: #666;
    font-size: 14px;
  }
}
</style>
