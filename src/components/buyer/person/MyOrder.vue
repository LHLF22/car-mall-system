<!--
 * @Date: 2024-03-06 14:28:17
 * @LastEditTime: 2024-03-11 10:28:28
 * @FilePath: \car-mall-system\src\components\buyer\person\MyOrder.vue
 * @Description: 
-->
<template>
  <div class="MyOrder">
    <div v-if="buyerLayoutStore.buyerOrder.length > 0">
      <div
        v-for="order in buyerLayoutStore.buyerOrder"
        :key="order.id"
        style="margin-bottom: 80px; border: 1px solid black"
      >
        <div
          v-for="shop in order.shop"
          :key="shop.id"
          style="margin-bottom: 20px; border: 1px dotted #ccc"
        >
          <div>{{ shop.storeInfo.name }}></div>
          <img :src="shop.images[0].url" style="width: 50px" alt="" />
          <div>{{ shop.name }}</div>
          <div>商品单价：￥{{ shop.price }}</div>
          <div>下单数量：x{{ shop.count }}</div>
          <div>预约提车时间：{{ shop.appointmentTime }}</div>
          <div
            v-if="shop.afterSaleType !== 0 && shop.isProcessed === 2"
            style="color: red"
          >
            退款与售后中:等待你将商品送回
          </div>
          <div
            v-else-if="shop.afterSaleType !== 0 && shop.isProcessed === 3"
            style="color: red"
          >
            退款与售后中:商家拒绝退款
          </div>
          <div
            v-else-if="shop.afterSaleType === 0 && shop.confirmReciept === 1"
          >
            <span style="color: orangered">交易成功</span>
            <el-button @click="afterSaleBtn(shop.id, order.id, shop.sellerId)"
              >申请售后</el-button
            >
          </div>
          <div v-else-if="shop.afterSaleType !== 0 && shop.isProcessed === 1">
            退款与售后：退款成功：{{ shop.count * shop.price }}
          </div>
          <div v-else>
            <el-button @click="confirmRecieptBtn(shop.id, order.id)"
              >确认收获</el-button
            >
            <el-button @click="afterSaleBtn(shop.id, order.id, shop.sellerId)"
              >退款</el-button
            >
          </div>
        </div>
        <div>订单创建时间：{{ order.createdAt }}</div>
        <div>订单总额：{{ order.price }}</div>
      </div>
    </div>
    <div v-else>
      <el-empty description="暂无订单" />
    </div>
    <el-dialog v-model="afterSaleVisible" title="Shipping address" width="500">
      <el-radio-group v-model="afterSaleType">
        <el-radio value="1" label="1">已提车要退款</el-radio>
        <el-radio value="2" label="2">未提车要退款</el-radio>
        <el-radio value="3" label="3">其他</el-radio>
      </el-radio-group>
      <el-input
        v-model="afterSaleDesc"
        type="textarea"
        placeholder="Please input"
      />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="afterSaleVisible = false">Cancel</el-button>
          <el-button type="primary" @click="confirmAfterSale">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { watch, getCurrentInstance, ComponentInternalInstance, ref } from "vue";
import useBuyerLayoutStore from "@/store/buyer-layout";
import { ElMessage, ElMessageBox } from "element-plus";
const { proxy }: ComponentInternalInstance = getCurrentInstance();
const buyerLayoutStore = useBuyerLayoutStore();
buyerLayoutStore.getBuyerOrder();
const confirmRecieptBtn = (carId, buyerOrderId) => {
  ElMessageBox.confirm("确认收货吗?", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      proxy.$buyerApi.person
        .confirmReciept({ carId, buyerOrderId })
        .then((res) => {
          if (res.code == 0) {
            ElMessage({
              type: "success",
              message: "确认收获成功",
            });
            buyerLayoutStore.getBuyerOrder();
          } else {
            ElMessage.error("操作失败");
          }
        });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "操作取消",
      });
    });
};
const afterSaleVisible = ref(false);
const afterSaleDesc = ref("");
const afterSaleState = ref({
  carId: null,
  buyerOrderId: null,
  sellerId: null,
});
const afterSaleBtn = (carId, buyerOrderId, sellerId) => {
  afterSaleVisible.value = true;
  afterSaleState.value = { carId, buyerOrderId, sellerId };
  console.log(afterSaleState.value, "??");
};
const afterSaleType = ref("1");
const confirmAfterSale = () => {
  if (!afterSaleDesc.value && !afterSaleType.value) return;
  //提交售后
  proxy.$buyerApi.person
    .afterSale({
      ...afterSaleState.value,
      desc: afterSaleDesc.value,
      afterSaleType: afterSaleType.value,
    })
    .then((res) => {
      if (res.code == 0) {
        // ElMessage.success("提交售后成功");
        buyerLayoutStore.getBuyerOrder();
        buyerLayoutStore.getAfterSales();
      } else {
        ElMessage.error("提交售后失败");
      }
    });
  afterSaleVisible.value = false;
};
/* watch(
  () => afterSaleVisible.value,
  (oldVal, newVal) => {
    if (!newVal) {
      afterSaleState.value = {
        carId: null,
        buyerOrderId: null,
        sellerId: null,
      };
    }
  }
); */
</script>

<style scoped lang="scss"></style>
, watch
