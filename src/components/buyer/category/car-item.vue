<!--
 * @Date: 2024-02-20 15:16:59
 * @LastEditTime: 2024-03-11 23:42:40
 * @FilePath: \car-mall-system\src\components\buyer\category\car-item.vue
 * @Description: 
-->
<template>
  <div class="car-item">
    <div @click="carItemClick">
      <div class="fl"><img class="img" :src="carData.images[0].url" /></div>
      <div class="price">￥ {{ carData.price }}</div>
      <div class="title">{{ carData.name }}</div>
    </div>

    <div>
      <el-icon @click="shopCartClick"><ShoppingCart /></el-icon>
      <el-icon @click="favorClick">
        <component :is="carData.isFavor === 0 ? Star : StarFilled"
      /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Star,
  StarFilled,
  ShoppingCart,
  ShoppingCartFull,
} from "@element-plus/icons-vue";
import { watch, ref, getCurrentInstance, ComponentInternalInstance } from "vue";
import { useRouter } from "vue-router";
import useBuyerLayoutStore from "@/store/buyer-layout";
import { ElMessage, ElMessageBox } from "element-plus";
// const emits = defineEmits(["favorChange",'shopCartChange']);
const emits = defineEmits(["favorChange"]);
const { proxy }: ComponentInternalInstance = getCurrentInstance();
interface IProps {
  carData: any;
}
const props = withDefaults(defineProps<IProps>(), {
  carData: {},
});
const router = useRouter();
const buyerLayoutStore = useBuyerLayoutStore();
const isZero = ref(props.carData.shopCart == 0 ? true : false);
const carItemClick = () => {
  router.push(`/detail/${props.carData.id}`);
};
const favorClick = () => {
  // console.log(props.carData)
  if (props.carData.isFavor === 0) {
    //加入favor列表，创建数据
    proxy.$buyerApi.person
      .createFavor({
        carId: props.carData.id,
        sellerId: props.carData.sellerId,
      })
      .then((res) => {
        if (res.code == 0) {
          //调一下获取汽车数据的接口
          emits("favorChange");
          buyerLayoutStore.getFavorList();
          ElMessage.success("收藏成功");
        } else {
          ElMessage.error("收藏失败");
        }
      });
  } else {
    //从favor列表中删除该项
    proxy.$buyerApi.person
      .deleteFavor({
        carId: props.carData.id,
        sellerId: props.carData.sellerId,
      })
      .then((res) => {
        if (res.code == 0) {
          //调一下获取汽车数据的接口
          emits("favorChange");
          buyerLayoutStore.getFavorList();
          ElMessage.error("取消收藏成功");
        } else {
          ElMessage.error("取消收藏失败");
        }
      });
  }
};
// watch(()=>props.carData.shopCart,(newVal,oldVal)=>{
//   consle.log(newVal,oldVal)
// if(newVal===0&&oldVal===1){
//   emits('shopCartChange')
// }
// if(newVal===1&&oldVal===2){
//   emits('shopCartChange')
// }
// })
const shopCartClick = () => {
  console.log(props.carData.shopCart ,'???')
  if (props.carData.shopCart === 0 && isZero.value) {
    buyerLayoutStore.createShopCart(props.carData.id, 1);
  } 
  else {
    console.log(buyerLayoutStore.shopCart,buyerLayoutStore.shopCart.filter((e) => e.id == props.carData.id),';;;')
    buyerLayoutStore.editShopCart(
      props.carData.id,
      parseInt(
        buyerLayoutStore.shopCart.filter((e) => e.id == props.carData.id)[0]
          .shopCart
      ) + 1
    );
  }

  isZero.value = false;

  // emits("favorChange");
};

</script>

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
  .img {
    width: 250px;
  }
}
</style>
