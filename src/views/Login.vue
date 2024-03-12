<!--
 * @Date: 2023-12-07 16:00:07
 * @LastEditTime: 2023-12-19 14:49:43
 * @FilePath: \car-mall-system\src\views\Login.vue
 * @Description: 登录页面
  1.点击登录，调用action,发送请求，请求通过，获取res信息，存储localStorage和state
  2.跳转页面，此时涉及路由守卫，
-->

<template>
  <div class="Login">
    <el-container>
     <!--  <el-aside width="60vw">Aside</el-aside> -->
     
      <el-main>
        <el-tabs
          v-model="activeName"
          class="demo-tabs"
          @tab-change="handleClick"
        >
          <el-tab-pane label="账号登录" name="login">
            <LoginOrRegisterPanel
              ref="loginPanelRef"
              :active-tab="activeName"
            ></LoginOrRegisterPanel>
          </el-tab-pane>
          <el-tab-pane label="注册" name="register">
            <LoginOrRegisterPanel
              :active-tab="activeName"
              ref="registerPanelRef"
              @change-to-login-panel="activeName = 'login'"
            ></LoginOrRegisterPanel>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, onMounted, watch } from "vue";
import LoginOrRegisterPanel from "../components/login-or-register-panel.vue";
// import { getCurrentInstance, ComponentInternalInstance } from "vue";
// const { proxy }: ComponentInternalInstance = getCurrentInstance();
// proxy.$buyerApi.home.getHomeDataApi({ account: "haha", id: 2 });

/* 切换tab */
const activeName = ref<string>("login");
const handleClick = (name: string) => {
  activeName.value = name;
};

/* 切换tab时，清空另一个tab的校验和数据 */
const loginPanelRef = ref(null);
const registerPanelRef = ref(null);
watch(activeName, () => {
  if (activeName.value === "login") {
    registerPanelRef.value.clearRegisterForm();
  } else {
    loginPanelRef.value.clearLoginForm();
  }
});
</script>

<style scoped lang="scss"></style>
