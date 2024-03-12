<!--
 * @Date: 2024-02-20 17:21:38
 * @LastEditTime: 2024-03-11 11:07:05
 * @FilePath: \car-mall-system\src\views\seller\StoreManage.vue
 * @Description: 
-->
<template>
  <div class="StoreManage">
    <el-card shadow="never">
      <template #header>
        <div>
          <span>店铺管理</span>
        </div>
      </template>
      <el-form
        :model="sellerLayoutStore.storeInfo"
        label-position="right"
        label-width="100px"
        style="max-width: 460px"
      >
        <el-form-item label="店铺名称：">
          <el-input
            v-model="sellerLayoutStore.storeInfo.name"
            @change="infoChange('name', $event)"
          />
        </el-form-item>
        <el-form-item label="店铺描述：">
          <el-input
            :rows="2"
            type="textarea"
            v-model="sellerLayoutStore.storeInfo.desc"
            @change="infoChange('desc', $event)"
          />
        </el-form-item>
        <el-form-item label="店铺位于：">
          <el-cascader
            :options="buyerLayoutStore.areaData"
            clearable
            v-model="sellerLayoutStore.storeInfo.province"
            @change="infoChange('province', $event)"
          />
        </el-form-item>
        <el-form-item label="店铺详细地址：">
          <el-input
            :rows="2"
            type="textarea"
            v-model="sellerLayoutStore.storeInfo.detailAddress"
            @change="infoChange('detailAddress', $event)"
          />
        </el-form-item>
        <el-form-item label="店铺联系方式：">
          <el-input
            :rows="2"
            type="textarea"
            v-model="sellerLayoutStore.storeInfo.phone"
            @change="infoChange('phone', $event)"
          />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref, reactive, onMounted } from "vue";
import avatar from "@/base-ui/avatar.vue";
import useLoginStore from "@/store/login";
import { getCurrentInstance, ComponentInternalInstance } from "vue";
import useSellerLayoutStore from "@/store/seller-layout.ts";
import useBuyerLayoutStore from "@/store/buyer-layout.ts";
const { proxy }: ComponentInternalInstance = getCurrentInstance();
const sellerLayoutStore = useSellerLayoutStore();
const buyerLayoutStore = useBuyerLayoutStore();
sellerLayoutStore.getStoreInfo();
buyerLayoutStore.getArea();

const infoChange = async (item, data) => {
  let params = {};
  if (item === "name") {
    params = { ...sellerLayoutStore.storeInfo, name: data };
  } else if (item === "desc") {
    params = { ...sellerLayoutStore.storeInfo, desc: data };
  } else if (item === "province") {
    params = { ...sellerLayoutStore.storeInfo, province: data };
  } else if (item === "detailAddress") {
    params = { ...sellerLayoutStore.storeInfo, detailAddress: data };
  } else if (item === "phone") {
    params = { ...sellerLayoutStore.storeInfo, phone: data };
  }
  proxy.$sellerApi.store.editStoreInfo(params).then((res) => {
    if (res.code == 0) {
      ElMessage.success("修改数据成功");
      sellerLayoutStore.getStoreInfo();
    } else {
      ElMessage.success("修改数据失败");
      sellerLayoutStore.getStoreInfo();
    }
  });
};
</script>

<style scoped lang="scss">
.w45 {
  width: 49%;
}
</style>
