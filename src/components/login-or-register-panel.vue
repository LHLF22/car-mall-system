<!--
 * @Date: 2023-12-08 16:09:45
 * @LastEditTime: 2023-12-11 16:05:07
 * @FilePath: \car-mall-system\src\components\login-or-register-panel.vue
 * @Description: 
 
-->
<template>
  <div class="login-panel">
    <el-radio-group v-model="role" size="large">
      <el-radio-button label="用户" />
      <el-radio-button label="商家" />
      <el-radio-button v-if="activeTab === 'login'" label="管理员" />
    </el-radio-group>
    <el-form
      ref="loginFormRef"
      label-position="right"
      label-width="100px"
      :model="loginForm"
      style="max-width: 460px"
      :rules="loginFormRule"
      v-if="props.activeTab === 'login'"
    >
      <el-form-item label="账号/手机号" prop="account">
        <el-input v-model="loginForm.account" placeholder="请输入账号/手机号" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          placeholder="请输入密码"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <el-form
      ref="registerFormRef"
      label-position="right"
      label-width="100px"
      :model="loginForm"
      style="max-width: 460px"
      :rules="registerFormRule"
      v-if="props.activeTab === 'register'"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model.model="registerForm.phone"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="registerForm.password"
          placeholder="请输入密码"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          v-model="registerForm.confirmPassword"
          placeholder="请输入密码"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="registerForm.code" placeholder="请输入密码" />
      </el-form-item>
    </el-form>
    <div class="fl">
      <el-button  @click="handleSubmit">{{
        props.activeTab === "login" ? "登录" : "注册"
      }}</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import useLoginStore from '../store/login'
import { ElMessage } from "element-plus";
const props = defineProps({
  activeTab:String
});
const role = ref<string>("用户");
interface loginFormType {
  account: String;
  password: Number;
}
const loginForm = reactive<loginFormType>({
  account: "",
  password: null,
});
const loginFormRef = ref<FormInstance>();
const loginFormRule = reactive<FormRules<loginFormType>>({
  account: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
  ],
});
interface registerFormType {
  phone: Number;
  password: String;
  confirmPassword: Number;
  code: Number;
}
const registerForm = reactive<registerFormType>({
  phone: null,
  password: "",
  confirmPassword: null,
  code: null,
});
const registerFormRef = ref<FormInstance>();
//注册表单的验证
const validatePhone = (rule: any, value: any, callback: any) => {
  if (!/^[3-9]{1}[0-9]{9}$/.test(value)) {
    return callback(new Error("请输入正确的手机号"));
  }
};
const validatePassword = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("Please input the password"));
  }
};
const validateConfirmPassword = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("Please input the confirmPassword"));
  } else {
    if (value !== registerForm.password) {
      return callback(new Error("与第一次密码不同"));
    }
  }
};
const validateCode = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("Please input the confirmPassword"));
  }
};
const registerFormRule = reactive<FormRules<typeof registerForm>>({
  phone: [{ validator: validatePhone, trigger: "blur" }],
  password: [{ validator: validatePassword, trigger: "blur" }],
  confirmPassword: [{ validator: validateConfirmPassword, trigger: "blur" }],
  code: [{ validator: validateCode, trigger: "blur" }],
});
const loginStore=useLoginStore()
function handleSubmit() {
  if (props.activeTab === "login") {
    loginFormRef.value.validate((valid) => {
      if (valid) {
        //发送请求，登录成功
        // isLoading.value = true;
        const params = { ...loginForm, role:role.value };
        /* setTimeout(() => {
          isLoading.value = false;
          //调用pinia中的action
        }, 2000); */
        loginStore.loginAction(params)
      } else {
        ElMessage.error("请检查表单输入是否合法！");
      }
    });
  } else {
    registerFormRef.value.validate((valid) => {
      if (valid) {
        //发送请求，登录成功
        // isLoading.value = true;
        const params = { ...registerForm, role:role.value  };
        /* setTimeout(() => {
          isLoading.value = false;
          //调用pinia中的action
        }, 2000); */
      } else {
        ElMessage.error("请检查表单输入是否合法！");
      }
    });
  }
}
// const isLoading = ref<Boolean>(false);
</script>

<style scoped lang="less"></style>
