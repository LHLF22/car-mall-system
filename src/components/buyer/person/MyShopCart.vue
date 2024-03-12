<template>
  <div class="MyShopCart">
    <div v-if="buyerLayoutStore.shopCart.length > 0">
      <div>
        <el-button @click="manageV = !manageV">{{
          manageV ? "取消管理" : "管理"
        }}</el-button>
      </div>
      <el-checkbox
        v-model="checkAll"
        :indeterminate="isIndeterminate"
        @change="handleCheckAllChange"
        v-if="manageV"
        >全选</el-checkbox
      >
      <el-checkbox-group
        v-model="checkedCities"
        @change="handleCheckedCitiesChange"
      >
        <div
          v-for="shop in buyerLayoutStore.shopCart"
          :key="shop.id"
          class="flex"
        >
          <el-checkbox :value="shop.id" :label="shop.id" />
          <div class="flex">
            <img style="width: 100px" :src="shop.images[0].url" alt="" />
            <div>
              <span>{{ shop.name }}</span>
              <div>单价：￥{{ shop.price }}</div>

              <el-input-number
                v-model="shop.shopCart"
                :min="0"
                @change="handleChange($event, shop)"
              />
            </div>
          </div>
        </div>
      </el-checkbox-group>
      <div>
        <span>总额：￥{{ totalPrice }}</span>
        <div>
          <el-button v-if="manageV" @click="deleteSelected">删除</el-button
          ><el-button v-if="checkedCities.length > 0" @click="paySelected"
            >下单</el-button
          ><el-button v-if="checkedCities.length > 0" @click="bookRide"
            >预约试驾￥：{{ checkedCities.length * 15 }}</el-button
          >
        </div>
      </div>
      <el-dialog
        v-model="dialogFormVisible"
        title="Shipping address"
        width="600"
      >
        <div
          v-for="shop in buyerLayoutStore.shopCart.filter((e) =>
            checkedCities.includes(e.id)
          )"
          :key="shop.id"
        >
          <img style="width: 100px" :src="shop.images[0].url" alt="" />
          <span>x{{ shop.shopCart }}</span>
          <div>
            <span>预约提车时间：</span>
            <el-date-picker
              v-model="appointmentTime[shop.id]"
              type="datetime"
              placeholder="提车时间"
              format="YYYY/MM/DD hh:mm:ss"
              value-format="YYYY-MM-DD hh:mm:ss"
            />
          </div>
        </div>
        <el-button @click="addressVisible = true">选择收货信息</el-button>
        <div v-if="myShippingChosed">
          <div>
            收获地址：
            {{
              buyerLayoutStore.shippingAddress.filter(
                (e) => e.id === myShippingChosed
              )[0].address
            }}
          </div>
          <div>
            联系人：
            {{
              buyerLayoutStore.shippingAddress.filter(
                (e) => e.id === myShippingChosed
              )[0].name
            }}
          </div>
          <div>
            联系号码：
            {{
              buyerLayoutStore.shippingAddress.filter(
                (e) => e.id === myShippingChosed
              )[0].phone
            }}
          </div>
        </div>

        <div style="margin-top: 20px">总额：￥{{ totalPrice }}</div>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="confirmPay"> Confirm </el-button>
          </div>
        </template>
      </el-dialog>
      <el-dialog v-model="addressVisible" width="500">
        <ShippingAddress
          @confirm-address="
            (radio) => {
              (myShippingChosed = radio), (addressVisible = false);
            }
          "
        ></ShippingAddress>
      </el-dialog>
    </div>
    <div v-else>
      <el-empty description="购物车为空" />
    </div>
  </div>
  
</template>

<script setup lang="ts">
import {
  watch,
  computed,
  ref,
  getCurrentInstance,
  ComponentInternalInstance,
} from "vue";
import useBuyerLayoutStore from "@/store/buyer-layout";
import ShippingAddress from "./ShippingAddress.vue";
import { ElMessage } from "element-plus";
const { proxy }: ComponentInternalInstance = getCurrentInstance();
const buyerLayoutStore = useBuyerLayoutStore();

const manageV = ref(false);
const checkAll = ref(false);
const isIndeterminate = ref(true);
const checkedCities = ref([]);
const cities = buyerLayoutStore.shopCart.map((e) => e.id);
const dialogFormVisible = ref(false);
const addressVisible = ref(false);
const myShippingChosed = ref(null);
const appointmentTime = ref({});
buyerLayoutStore.getShopCart();

const totalPrice = computed(() => {
  const nowShop = buyerLayoutStore.shopCart.filter((e) =>
    checkedCities.value.includes(e.id)
  );
  return nowShop.reduce((acc, val) => {
    return (acc += val.shopCart * val.price);
  }, 0);
});

const handleChange = (value: number, item: any) => {
  if (item.shopCart == 0) {
    buyerLayoutStore.createShopCart(item.id, value);
  } else {
    buyerLayoutStore.editShopCart(item.id, value);
  }
};

const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? cities : [];
  isIndeterminate.value = false;
};

const handleCheckedCitiesChange = (value: string[]) => {
  console.log(value,'??')
  const checkedCount = value.length;
  checkAll.value = checkedCount === cities.length;
  checkedCities.value = value;
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length;
};

const deleteSelected = () => {
  proxy.$buyerApi.carDetail.deleteShopCart(checkedCities.value).then((res) => {
    if (res.code == 0) {
      buyerLayoutStore.getShopCart();
    } else {
    }
  });
};

const paySelected = () => {
  dialogFormVisible.value = true;
  appointmentTime.value={}
  myShippingChosed.value=null
};

const confirmPay = () => {
  console.log(checkedCities.value,'checkedCities.value')
  if (!myShippingChosed.value) {
    ElMessage.error("请先选择收货地址");
    return;
  }
  console.log(
    Object.keys(appointmentTime.value),
    buyerLayoutStore.shopCart.filter((el) =>
      checkedCities.value.includes(el.id)
    ),
    checkedCities.value
  );
  if (
    Object.keys(appointmentTime.value).length !==
    buyerLayoutStore.shopCart.filter((el) =>
      checkedCities.value.includes(el.id)
    ).length
  ) {
    ElMessage.error("请先预约提车时间");
    return;
  }
  const shopItems = buyerLayoutStore.shopCart
    .filter((el) => checkedCities.value.includes(el.id))
    .map((e) => ({
      carId: e.id,
      count: e.shopCart,
      price: e.price,
      appointmentTime: appointmentTime.value[e.id],
    }));
  console.log(shopItems, "2");
  /* 下单成功后从购物车中移除：sql实现 */
  proxy.$buyerApi.carDetail
    .shopCartPay({
      shopItems,
      price: totalPrice.value,
      buyerShippingAddressId: myShippingChosed.value,
    })
    .then((res) => {
      if (res.code == 0) {
        // buyerLayoutStore.getShopCart();
        buyerLayoutStore.getShippingAddress();
        buyerLayoutStore.getBuyerOrder();
        dialogFormVisible.value = false;
      } else {
        ElMessage.error(res.msg);
      }
    });
};
const bookRide=()=>{
  //预约试驾
  console.log()
}
</script>

<style scoped lang="scss">
:deep(.el-checkbox-group) {
  font-size: 16px;
  line-height: 16px;
}
</style>
