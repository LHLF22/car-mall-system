<!--
 * @Date: 2024-02-20 17:00:16
 * @LastEditTime: 2024-03-10 23:35:13
 * @FilePath: \car-mall-system\src\views\seller\ToDoList.vue
 * @Description: 
-->
<template>
  <div>
    <el-table
      row-key="date"
      :data="sellerLayoutStore.toDoListTable"
      style="width: 100%"
    >
      <el-table-column prop="orderId" label="订单编号" />
      <el-table-column prop="carName" label="商品名称" width="200">
        <template #default="scope">
          <div class="f">
            <img
              v-if="scope.row.images"
              style="width: 50px"
              :src="scope.row.images[0].url"
              alt=""
            />
            <div>{{ scope.row.carName }}</div>
          </div>
        </template></el-table-column
      >

      <el-table-column
        prop="totalPrice"
        label="总支付金额"
        width="120"
        sortable
      />
      <el-table-column prop="count" label="下单数量" width="110" sortable />
      <el-table-column prop="createdAt" label="申请时间" width="170" sortable />
      <el-table-column
        prop="appointmentTime"
        label="预约提车时间"
        width="170"
        sortable
      />
      <el-table-column prop="buyerAddress" label="买家地址" width="150" />
      <el-table-column prop="buyerPhone" label="买家手机号" width="120" />
      <el-table-column prop="buyerName" label="买家姓名" />
      <el-table-column
        prop="confirmReciept"
        label="是否确认收货"
        :filters="[
          { text: '已确认收货', value: '已确认收货' },
          { text: '未确认收货', value: '未确认收货' },
        ]"
        :filter-method="
          (value, row) => {
            return value === row.confirmReciept;
          }
        "
        filter-placement="bottom-end"
        width="130"
      >
        <template #default="scope">
          <el-tag
            :type="scope.row.confirmReciept === '已确认收货' ? 'success' : ''"
            disable-transitions
            >{{
              scope.row.confirmReciept === "已确认收货"
                ? "已确认收货"
                : "未确认收货"
            }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="afterSaleType"
        label="用户退款与售后"
        width="150"
        :filters="
          Array.from(
            new Set(
              sellerLayoutStore.toDoListTable.map((e) => e.afterSaleType)
            )
          ).map((el) => ({ text: el, value: el }))
        "
        :filter-method="
          (value, row) => {
            return value === row.afterSaleType;
          }
        "
        filter-placement="bottom-end"
      />
      <el-table-column
        prop="isProcessed"
        label="处理退款与售后结果"
        :filters="
          Array.from(
            new Set(sellerLayoutStore.orderTableList.map((e) => e.isProcessed))
          ).map((el) => ({ text: el, value: el }))
        "
        :filter-method="
          (value, row) => {
            return value === row.isProcessed;
          }
        "
        filter-placement="bottom-end"
        width="130"
      >
        <template #default="scope">
          <el-tag
            :type="
              scope.row.isProcessed === '未处理'
                ? ''
                : scope.row.isProcessed === '商家直接退款'
                ? 'success'
                : scope.row.isProcessed === '商家同意退款等待用户送回商品'
                ? 'success'
                : scope.row.isProcessed === '拒绝退款'
                ? 'success'
                : ''
            "
            disable-transitions
            >{{
              scope.row.isProcessed === "未处理"
                ? "未处理"
                : scope.row.isProcessed === "商家直接退款"
                ? "商家直接退款"
                : scope.row.isProcessed === "商家同意退款等待用户送回商品"
                ? "商家同意退款等待用户送回商品"
                : scope.row.isProcessed === "拒绝退款"
                ? "拒绝退款"
                : "无需处理"
            }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="desc" label="用户退款与售后原因" width="110" />
      <el-table-column prop="isSuccess" label="商家是否已退款" width="110" />
      <el-table-column prop="sellerDesc" label="拒绝退款原因" width="110" />
      <el-table-column label="Operations" width="140">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >操作</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      class="car-dialog"
      v-model="dialogFormVisible"
      title="Shipping address"
      width="500"
    >
      <el-radio-group v-model="isProcessed">
        <el-radio value="1" label="1">不用用户退货直接退款</el-radio>
        <el-radio value="2" label="2">用户退货后再退款</el-radio>
        <el-radio value="3" label="3">拒绝退款</el-radio>
      </el-radio-group>
      <el-input
        v-if="isProcessed === '3'"
        v-model="sellerDesc"
        type="textarea"
        placeholder="拒绝退款原因"
        :rows="4"
      />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="confirm"> Confirm </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, getCurrentInstance, ComponentInternalInstance } from "vue";
import type { UploadProps, TableInstance } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import useSellerLayoutStore from "@/store/seller-layout";
const { proxy }: ComponentInternalInstance = getCurrentInstance();
const sellerLayoutStore = useSellerLayoutStore();
sellerLayoutStore.getToDoList();
const dialogFormVisible = ref(false);
const isProcessed = ref("2");
const sellerDesc = ref("");
const currentRow = ref(null);

const handleEdit = (row) => {
  dialogFormVisible.value = true;
  currentRow.value = row;
};
const confirm = () => {
  if (!currentRow.value) return;
  if (isProcessed.value === "3" && !sellerDesc.value) {
    ElMessage.error("请填写拒绝退款的原因");
    return;
  }
  const params =
    isProcessed.value === "3"
      ? {
          sellerDesc: sellerDesc.value,
          isProcessed: isProcessed.value,
          id: currentRow.value.afterSaleId,
          isSuccess: 0,
          orderId: currentRow.value.orderId,
        }
      : isProcessed.value === "2"
      ? {
          sellerDesc: "",
          isProcessed: isProcessed.value,
          id: currentRow.value.afterSaleId,
          isSuccess: 0,
          orderId: currentRow.value.orderId,
        }
      : {
          sellerDesc: "",
          isProcessed: isProcessed.value,
          id: currentRow.value.afterSaleId,
          isSuccess: 1,
          orderId: currentRow.value.orderId,
        };

  proxy.$sellerApi.order.dealAfterSale(params).then((res) => {
    if (res.code == 0) {
      ElMessage.success("成功");
      sellerLayoutStore.getToDoList();
    } else {
      ElMessage.error("失败");
    }
  });
};
watch(
  () => dialogFormVisible.value,
  (newVal, oldVal) => {
    if (!newVal) {
      currentRow.value = null;
    }
  }
);
</script>

<style scoped lang="scss">
:deep(.el-dialog) {
  width: 50vw;
  max-height: 80vh;
  overflow-y: auto;
  @include scrollbar();
}
</style>
