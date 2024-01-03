<!--
 * @Date: 2023-12-29 15:24:59
 * @LastEditTime: 2024-01-02 16:57:28
 * @FilePath: \car-mall-system\src\layout\person.vue
 * @Description: 后台管理系统中的个人中心 （商家、管理员）
-->

<template>
  <div class="person flSB">
    <el-card class="w45" shadow="never">
      <template #header>
        <div>
          <span>基础信息</span>
          <!-- <el-button class="button" text>Operation button</el-button> -->
        </div>
      </template>
      <div>
        <div class="avatar fl m10">
          <avatar :avatar-size="100" />
        </div>
        <div class="nickname fl m10">{{ loginStore.userInfo.account }}</div>
        <div class="sign fl m10"></div>
      </div>
      <!-- <div v-for="o in 4" :key="o" class="text item">
        {{ "List item " + o }}
      </div>
      <template #footer>Footer content</template> -->
    </el-card>
    <el-card class="w45" shadow="never">
      <template #header>
        <div>
          <span>账户编辑</span>
        </div>
      </template>
      <el-form
        label-position="right"
        label-width="100px"
        style="max-width: 460px"
      >
        <el-form-item label="用户名：">
          <el-input v-model="account" @change="infoChange('account', $event)" />
        </el-form-item>
        <el-form-item label="密码：">
          <el-input
            v-model="password"
            @change="infoChange('password', $event)"
          />
        </el-form-item>
        <el-form-item label="性别：">
          <el-input v-model="gender" @change="infoChange('gender', $event)" />
        </el-form-item>
        <el-form-item label="个人简介：">
          <el-input
            :rows="2"
            type="textarea"
            v-model="introduction"
            @change="infoChange('introduction', $event)"
          />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref, reactive } from "vue";
import avatar from "../base-ui/avatar.vue";
import useLoginStore from "../store/login";
import { getCurrentInstance, ComponentInternalInstance } from "vue";
import { storeToRefs } from "pinia";
const { proxy }: ComponentInternalInstance = getCurrentInstance();
const loginStore = useLoginStore();
const { userInfo } = storeToRefs(loginStore);
const account = ref<string>(userInfo.value.account);
const password = ref<string>(userInfo.value.password);
const gender = ref<string>(userInfo.value.gender);
const introduction = ref(userInfo.value.introduction);
async function infoChange(item, data) {
  console.log(item, data, "data");
  if (item === "account") {
    const res = await proxy.$userApi.editAccount({
      account: data,
      id: userInfo.value.id,
      role: userInfo.value.role,
    });
    if (res.code === 0) {
      const original = { ...userInfo.value, account: res.data.account };
      loginStore.SET_USERINFO(original);
      ElMessage.success(res.msg);
    } else {
      ElMessage.error(res.msg);
      account.value = userInfo.value.account;
    }
  } else if (item === "password") {
    const res = await proxy.$userApi.editPassword({
      password: data,
      id: userInfo.value.id,
    });
    if (res.code === 0) {
      const original = { ...userInfo.value, password: res.data.password };
      loginStore.SET_USERINFO(original);
      ElMessage.success(res.msg);
    } else {
      ElMessage.error(res.msg);
      password.value = userInfo.value.account;
    }
  }else if (item === "gender") {
    const res = await proxy.$userApi.editGender({
      gender: data,
      id: userInfo.value.id,
    });
    if (res.code === 0) {
      const original = { ...userInfo.value, gender: res.data.gender };
      loginStore.SET_USERINFO(original);
      ElMessage.success(res.msg);
    } else {
      ElMessage.error(res.msg);
      gender.value = userInfo.value.gender;
    }
  }else if (item === "introduction") {
    const res = await proxy.$userApi.editIntroduction({
      introduction: data,
      id: userInfo.value.id,
    });
    if (res.code === 0) {
      const original = { ...userInfo.value, introduction: res.data.introduction };
      loginStore.SET_USERINFO(original);
      ElMessage.success(res.msg);
    } else {
      ElMessage.error(res.msg);
      introduction.value = userInfo.value.introduction;
    }
  }
}
</script>

<style scoped lang="scss">
.w45 {
  width: 49%;
}
</style>
