<!--
 * @Date: 2024-02-20 16:03:00
 * @LastEditTime: 2024-03-11 23:37:30
 * @FilePath: \car-mall-system\src\views\buyer\CarDetail.vue
 * @Description: 
-->
<template>
  <div class="car-detail">
    <div>
      <el-page-header @back="router.go(-1)">
        <template #breadcrumb>
          <el-breadcrumb separator=">">
            <el-breadcrumb-item>{{ CarDetailData.carType }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ CarDetailData.brand }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ CarDetailData.name }}</el-breadcrumb-item>
          </el-breadcrumb>
        </template>
      </el-page-header>
      <div class="top">
        <div class="big-img">
          <div class="demo-image__preview" v-if="currentImg">
            <el-image
              class="big-img"
              :src="currentImg"
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              :preview-src-list="CarDetailData.images.map((el) => el.url)"
              :initial-index="
                CarDetailData.images.findIndex((el) => el.url == currentImg)
              "
              fit="cover"
            />
          </div>
          <el-image v-else>
            <template #error>
              <div class="image-slot">
                <el-icon><icon-picture /></el-icon>
              </div>
            </template>
          </el-image>
          <div class="flex">
            <img
              class="small-img m5"
              v-for="image in CarDetailData.images"
              :key="image.url"
              :src="image.url"
              alt=""
              @click="currentImg = image.url"
            />
          </div>
        </div>

        <div class="main">
          <div class="title mb15">{{ CarDetailData.name }}</div>
          <div class="price mb15">￥{{ CarDetailData.price }}</div>
          <div class="mb15">
            加入购物车
            <el-input-number
              style="width: 100px"
              v-model="CarDetailData.shopCart"
              :min="0"
              @change="handleChange"
            />
            <div>
              <el-icon @click="favorClick"
                ><component
                  :is="CarDetailData.isFavor === 0 ? Star : StarFilled"
              /></el-icon>
            </div>
          </div>

          <!-- 商家位置 -->
          <div class="mb15">
            提车地区：<el-cascader
              :options="buyerLayoutStore.areaData"
              clearable
              v-model="storeInfo.province"
              disabled
            />
          </div>
          <div @click="storeClick">店铺：{{ storeInfo.name }}</div>
        </div>
      </div>
      <div class="middle">
        <el-tabs>
          <el-tab-pane label="商品介绍">
            <el-descriptions :title="CarDetailData.brand">
              <el-descriptions-item label="商品名称">{{
                CarDetailData.name
              }}</el-descriptions-item>
              <el-descriptions-item label="商品编号">{{
                CarDetailData.id
              }}</el-descriptions-item>
              <el-descriptions-item label="店铺">{{
                storeInfo.name
              }}</el-descriptions-item>
              <el-descriptions-item label="生产方式"
                >{{ CarDetailData.productionMode }}
              </el-descriptions-item>
              <el-descriptions-item label="价格区间"
                >{{ CarDetailData.priceRange }}
              </el-descriptions-item>
              <el-descriptions-item label="排量">
                {{ CarDetailData.displacement }}</el-descriptions-item
              >
              <el-descriptions-item label="进气形式"
                >{{ CarDetailData.intakeForm }}
              </el-descriptions-item>
              <el-descriptions-item label="能源类型"
                >{{ CarDetailData.energyType }}
              </el-descriptions-item>
              <el-descriptions-item label="变速器类型"
                >{{ CarDetailData.transmissionType }}
              </el-descriptions-item>
              <el-descriptions-item label="座位数">{{
                CarDetailData.seats
              }}</el-descriptions-item>
            </el-descriptions>
          </el-tab-pane>
          <el-tab-pane label="规格与包装"></el-tab-pane>
          <el-tab-pane label="售后保障">售后保障</el-tab-pane>
          <!--           <el-tab-pane label="商品评价">商品评价</el-tab-pane> -->
        </el-tabs>
      </div>
    </div>
    <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
      <div>
        <div>店铺名称：{{ storeInfo.name }}</div>
        <div>店铺描述：{{ storeInfo.desc }}</div>
        <div>店铺成立：{{ dayjs().diff(storeInfo.createdAt, "day") }}天了</div>
        <div>店铺位于：{{ storeInfo.province.join("") }}</div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            type="primary"
            @click="router.push(`/store/${CarDetailData.sellerId}`)"
          >
            进入店铺
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  watchEffect,
  getCurrentInstance,
  ComponentInternalInstance,
} from "vue";
import { Star, StarFilled } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import useBuyerLayoutStore from "../../store/buyer-layout";
import dayjs from "dayjs";

const { proxy }: ComponentInternalInstance = getCurrentInstance();
// const num = ref(0);
const count = ref(0);
const CarDetailData = ref<any>({});
const currentImg = ref<string>("");
const storeInfo = ref({});
const route = useRoute();
const router = useRouter();
const buyerLayoutStore = useBuyerLayoutStore();
watchEffect(() => {
  if (route.params.id) {
    proxy.$buyerApi.carDetail.getCarSpecialById(route.params.id).then((res) => {
      if (res.code == 0) {
        CarDetailData.value = res.data;
        count.value = res.data.shopCart;
        currentImg.value = CarDetailData.value.images[0].url;

        proxy.$sellerApi.store
          .getStoreInfo(CarDetailData.value.sellerId)
          .then((res) => {
            if (res.code == 0) {
              storeInfo.value = res.data;
            }
          });
      }
    });
  }
});

const init = () => {
  proxy.$buyerApi.carDetail.getCarSpecialById(route.params.id).then((res) => {
    if (res.code == 0) {
      CarDetailData.value = res.data;
      count.value = res.data.shopCart;
      currentImg.value = CarDetailData.value.images[0].url;

      proxy.$sellerApi.store
        .getStoreInfo(CarDetailData.value.sellerId)
        .then((res) => {
          if (res.code == 0) {
            storeInfo.value = res.data;
          }
        });
    }
  });
};
// const buyerId = JSON.parse(localStorage.getItem("userInfo")).id;
const handleChange = (value: number) => {
  if (count.value == 0) {
    buyerLayoutStore
      .createShopCart(CarDetailData.value.id, value)
      .then((isSucess) => {
        if (isSucess) {
          init();
          // buyerLayoutStore.getAllCar()
        }
      })
      .catch(() => {
        init();
      });
      emits('shopCartChange')
  } else {
    buyerLayoutStore
      .editShopCart(CarDetailData.value.id, value)
      .then((isSucess) => {
        if (isSucess) {
          init();
        }
      })
      .catch(() => {
        init();
      });
  }
};
const dialogFormVisible = ref(false);
const storeClick = () => {
  dialogFormVisible.value = true;
};
const favorClick = () => {
  if (CarDetailData.value.isFavor === 0) {
    //加入favor列表，创建数据
    proxy.$buyerApi.person
      .createFavor({
        carId: CarDetailData.value.id,
        sellerId: CarDetailData.value.sellerId,
      })
      .then((res) => {
        if (res.code == 0) {
          //调一下获取汽车数据的接口
          init();
          buyerLayoutStore.getFavorList();
        } else {
          ElMessage.error("收藏失败");
        }
      });
  } else {
    //从favor列表中删除该项
    proxy.$buyerApi.person
      .deleteFavor({
        carId: CarDetailData.value.id,
        sellerId: CarDetailData.value.sellerId,
      })
      .then((res) => {
        if (res.code == 0) {
          //调一下获取汽车数据的接口
          init();
          buyerLayoutStore.getFavorList();
        } else {
          ElMessage.error("取消收藏失败");
        }
      });
  }
};
</script>

<style scoped lang="scss">
.car-detail {
  .top {
    display: flex;
    .big-img {
      width: 300px;
    }
    .small-img {
      width: 50px;
    }
  }
  .main {
    margin-left: 20px;
    justify-content: space-between;
    .title {
      font-size: 20px;
    }
    .price {
      color: #e4393c;
      font-weight: 600;
      font-size: 18px;
    }
  }
}
.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
:deep(.el-image-viewer__canvas) {
  transform: scale(1.7);
}
</style>
import dayjs from "dayjs"; import dayjs from "dayjs";
