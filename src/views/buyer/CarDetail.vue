<template>
  <div class="car-detail">
    <div class="top">
      <img src="@/assets/img/car1.jpg" alt="" />
      <div class="flC main">
        <div class="title">全款 上汽大众出品-威然380TSI尊驰版</div>
        <div class="price">￥ 274800.00</div>
        <div>
          <el-input-number
            v-model="num"
            :min="1"
            :max="10"
            @change="handleChange"
          />加入购物车
        </div>
        <div>提车地区</div>
        <div>选择经销商</div>
      </div>
    </div>
    <div class="middle">
      <el-tabs type="border-card">
        <el-tab-pane label="商品介绍">商品介绍</el-tab-pane>
        <el-tab-pane label="规格与包装">规格与包装</el-tab-pane>
        <el-tab-pane label="售后保障">售后保障</el-tab-pane>
        <el-tab-pane label="商品评价">商品评价</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const num = ref(1);
const handleChange = (value: number) => {
  console.log(value);
};
</script>

<style scoped lang="scss">
.car-detail {
  .top {
    display: flex;
  }
  .main {
    margin-left: 20px;
    justify-content: space-between;
    .title {
      font: 700 16px Arial, "microsoft yahei";
      color: #666;
    }
    .price {
      color: #e4393c;
      font-size: 18px;
    }
  }
}
</style>
