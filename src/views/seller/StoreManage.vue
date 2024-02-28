<!--
 * @Date: 2024-02-20 17:21:38
 * @LastEditTime: 2024-02-28 14:35:46
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
        :model="storeForm"
        label-position="right"
        label-width="100px"
        style="max-width: 460px"
      >
        <el-form-item label="店铺名称：">
          <el-input
            v-model="storeForm.name"
            @change="infoChange('name', $event)"
          />
        </el-form-item>
        <el-form-item label="店铺描述：">
          <el-input
            :rows="2"
            type="textarea"
            v-model="storeForm.desc"
            @change="infoChange('desc', $event)"
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
import { storeToRefs } from "pinia";
const { proxy }: ComponentInternalInstance = getCurrentInstance();
const loginStore = useLoginStore();
const { userInfo } = storeToRefs(loginStore);
const storeForm = ref({
  name: "",
  desc: "",
});
const storeInfo = ref({
  id: "",
  name: "",
  desc: "",
  sellerId:''
});
onMounted(() => {
  init();
});
const init = () => {
  //获取店铺的信息
  proxy.$sellerApi.store.getStoreInfo({ id: userInfo.value.id }).then((res) => {
    if (res.code == 0) {
      storeInfo.value = res.data;
      storeForm.value = res.data;
    } else {
      console.log("获取店铺信息失败");
    }
  });
};
const infoChange = async (item, data) => {
  console.log(item, data, "data");
  if (item === "name") {
    const res = await proxy.$sellerApi.store.editStoreName({
      name: data,
      id: storeInfo.value.sellerId,
    });
    if (res.code === 0) {
      storeInfo.value = { ...storeInfo.value, name: res.data.account };
      ElMessage.success(res.msg);
    } else {
      ElMessage.error(res.msg);
    }
  } else if (item === "desc") {
    const res = await proxy.$sellerApi.store.editStoreDesc({
      desc: data,
      id: storeInfo.value.sellerId,
    });
    if (res.code === 0) {
      storeInfo.value = { ...storeInfo.value, desc: res.data.desc };
      ElMessage.success(res.msg);
    } else {
      ElMessage.error(res.msg);
    }
  }
};
</script>

<style scoped lang="scss">
.w45 {
  width: 49%;
}
</style>
