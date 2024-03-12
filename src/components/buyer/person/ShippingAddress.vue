<!--
 * @Date: 2024-03-05 16:36:03
 * @LastEditTime: 2024-03-06 11:48:52
 * @FilePath: \car-mall-system\src\components\buyer\car-detail\ShippingAddress.vue
 * @Description: 
-->
<template>
  <div>
    <el-button @click="editAddress">新增收获地址</el-button>
    <div v-if="buyerLayoutStore.shippingAddress.length === 0">空</div>
    <div v-else>
      <el-radio-group v-model="radio">
        <el-radio
          v-for="address in buyerLayoutStore.shippingAddress"
          :key="address.id"
          :label="address.id"
          style="height: 120px"
        >
          <template #default>
            <div class="flex">
              <div>
                <div>
                  地址：{{ address.province?address.province.join(''):'' }}{{ address.detailAddress }}
                </div>
                <div>联系人：{{ address.name }}</div>
                <div>联系号码：{{ address.phone }}</div>
              </div>
              <div>
                <el-button @click="deleteAddress(address.id)">删除</el-button>
                <el-button @click="editAddress(address)">编辑</el-button>
              </div>
            </div>
          </template>
        </el-radio>
      </el-radio-group>
      <el-button>取消</el-button
      ><el-button @click="confirmAddressBtn">确定</el-button>
    </div>
    <el-dialog v-model="addAddressdialog" title="Shipping address">
      <el-form :model="form">
        <el-form-item label="Promotion name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="省市区">
          <el-cascader
            v-model="form.province"
            :options="buyerLayoutStore.areaData"
            clearable
          />
        </el-form-item>
        <el-form-item label="联系人号码">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="form.detailAddress" />
        </el-form-item>
        <!-- <el-form-item label="地址">
          <div>{{ form.province?form.province.join(''):'' }} {{ form.detailAddress }}</div>
        </el-form-item> -->
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancelChange(address)">Cancel</el-button>
          <el-button type="primary" @click="addShippingAddress(form)">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, getCurrentInstance, ComponentInternalInstance } from "vue";
import useBuyerLayoutStore from "@/store/buyer-layout";
const { proxy }: ComponentInternalInstance = getCurrentInstance();
const emits = defineEmits(["confirmAddress"]);
const buyerLayoutStore = useBuyerLayoutStore();
const addAddressdialog = ref(false);
const radio = ref(null);
const form = ref({
  name: "",
  province: "",
  phone: "",
  detailAddress: "",
});

buyerLayoutStore.getShippingAddress();

const addShippingAddress = (form) => {
  const { name, phone, province, detailAddress } = form
  const params = {
      name,
      phone,
      province,
      detailAddress,
    };
  if (form.id) {
    /* 确定编辑 */
    proxy.$buyerApi.carDetail.editShippingAddress({...params,id:form.id}).then((res) => {
      if (res.code == 0) {
        addAddressdialog.value = false;
        buyerLayoutStore.getShippingAddress();
      } else {
      }
    });
  } else {
    /* 确定编辑 */
    proxy.$buyerApi.carDetail.addShippingAddress(params).then((res) => {
      if (res.code == 0) {
        addAddressdialog.value = false;
        buyerLayoutStore.getShippingAddress();
      } else {
      }
    });
  }
};
const confirmAddressBtn = () => {
  emits("confirmAddress", radio.value);
};
const deleteAddress = (id) => {
  proxy.$buyerApi.carDetail.deleteShippingAddress(id).then((res) => {
    if (res.code == 0) {
      // addAddressdialog.value = false;
      buyerLayoutStore.getShippingAddress();
    } else {
    }
  });
};
const editAddress = (address = {}) => {
const tempt={...address}
  addAddressdialog.value = true;
  if (address.id) {
    form.value = tempt;
  } else {
    form.value = {
      name: "",
      province: [],
      phone: "",
      detailAddress: "",
    };
  }
};
const cancelChange=(address={})=>{
  form.value = address 
  addAddressdialog.value = false

}
</script>

<style scoped lang="scss"></style>
