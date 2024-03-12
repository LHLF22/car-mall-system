<!--
 * @Date: 2024-03-10 12:26:45
 * @LastEditTime: 2024-03-11 00:07:48
 * @FilePath: \car-mall-system\src\components\buyer\person\MyAfterSale.vue
 * @Description: 
-->
<template>
  <div class="MyAfterSale">
    <div v-if="buyerLayoutStore.afterSales.length > 0">
      <div
        v-for="afterSale in buyerLayoutStore.afterSales"
        :key="afterSale.id"
        style="border: 1px solid black; margin-bottom: 20px"
        @click="itemClick(afterSale)"
      >
        <div class="flex" style="border: 1px solid #ccc; margin-bottom: 10px">
          <img
            :src="afterSale.carInfo.images[0].url"
            alt=""
            style="width: 50px"
          />
          <div>
            <div>{{ afterSale.carInfo.name }}</div>
            <div>x{{ afterSale.orderInfo.count }}</div>
            <div>单价：{{ afterSale.orderInfo.price }}</div>
            <div>
              退款金额：{{
                afterSale.orderInfo.count * afterSale.orderInfo.price
              }}
            </div>
          </div>
        </div>
        <div v-if="afterSale.afterSaleType === 0">退款已关闭</div>
        <div v-else-if="afterSale.isProcessed === 0&&afterSale.afterSaleType !== 0" style="color: orangered">
          待商家处理
        </div>
        <div v-else-if="afterSale.isProcessed === 3">
        <div>退款失败</div>
        <div>商家拒绝退款：{{afterSale.sellerDesc  }}</div>
        </div>
        <div v-else-if="afterSale.isProcessed === 2">等待你将商品送回</div>
        <div v-else>
          退款成功：{{ afterSale.orderInfo.count * afterSale.orderInfo.price }}
        </div>
      </div>
    </div>
    <div v-else><el-empty description="暂无退款与售后" /></div>
    <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
      <div class="flex" style="border: 1px solid #ccc; margin-bottom: 10px">
        <img
          :src="currentAfterSale.carInfo.images[0].url"
          alt=""
          style="width: 50px"
        />
        <div>
          <div>{{ currentAfterSale.carInfo.name }}</div>
          <!--  <div>x{{ currentAfterSale.orderInfo.count }}</div> -->
          <!--  <div>单价：{{ currentAfterSale.orderInfo.price }}</div> -->
        </div>
      </div>
      <div>
        <div>申请时间：{{ currentAfterSale.createdAt }}</div>
        <div>申请原因：{{ currentAfterSale.desc }}</div>
        <div>申请件数：{{ currentAfterSale.orderInfo.count }}</div>
        <div>
          退款金额：￥{{
            currentAfterSale.orderInfo.count * currentAfterSale.orderInfo.price
          }}
        </div>
      </div>
      <div v-if="currentAfterSale.afterSaleType === 0">退款已关闭</div>
      <div
        v-else-if="currentAfterSale.isProcessed === 0&&afterSale.afterSaleType !== 0"
        style="color: orangered"
      >
        <div>待商家处理</div>
        <el-button
          @click="
            cancelApplication(
              currentAfterSale.id,
              currentAfterSale.orderInfo.id
            )
          "
          >撤销申请</el-button
        >
      </div>
      <div v-else-if="currentAfterSale.isProcessed === 3">
        <div>退款失败</div>
        <div v-if="currentAfterSale.sellerDesc">
          商家拒绝退款：{{ currentAfterSale.sellerDesc }}
        </div>
      </div>
      <div v-else-if="currentAfterSale.isProcessed === 2">等待你将商品送回</div>
      <div v-else>
        退款成功：{{
          currentAfterSale.orderInfo.count * currentAfterSale.orderInfo.price
        }}
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, ComponentInternalInstance } from "vue";
import useBuyerLayoutStore from "@/store/buyer-layout";
import { ElMessage } from "element-plus";
const { proxy }: ComponentInternalInstance = getCurrentInstance();
const buyerLayoutStore = useBuyerLayoutStore();
buyerLayoutStore.getAfterSales();
const dialogFormVisible = ref(false);
const currentAfterSale = ref(null);
const itemClick = (afterSale) => {
  currentAfterSale.value = afterSale;
  dialogFormVisible.value = true;
};
const cancelApplication = (afterSaleId, orderId) => {
  proxy.$buyerApi.person.cancelApplication(afterSaleId, orderId).then((res) => {
    if (res.code == 0) {
      ElMessage.success("撤销申请成功");
      buyerLayoutStore.getAfterSales();
      buyerLayoutStore.getBuyerOrder();
    } else {
      ElMessage.error("撤销申请失败");
    }
  });
};
</script>

<style scoped lang="scss"></style>
