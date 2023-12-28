<!--
 * @Date: 2023-12-27 10:08:43
 * @LastEditTime: 2023-12-28 10:12:47
 * @FilePath: \car-mall-system\src\components\buyer\layout\avatar-panel.vue
 * @Description: 
-->
<template>
  <el-card class="box-card">
    <div class="fl">
      <avatar />
    </div>
    <div class="fl">
      <nickname />
    </div>
    <template #footer
      ><el-button @click="loginStore.loginOut">退出登录</el-button
      ><el-button @click="router.push('/person')">我的主页</el-button></template
    >
  </el-card>
</template>

<script setup lang="ts">
import avatar from "../../../base-ui/avatar.vue";
import nickname from "../../../base-ui/nickname.vue";
import useLoginStore from "../../../store/login";
import {useRouter} from "vue-router";
const loginStore = useLoginStore();
const router = useRouter();
</script>

<style scoped lang="scss">
.el-card {
  width: 228px;
}
</style>
