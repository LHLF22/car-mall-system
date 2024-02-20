<!--
 * @Date: 2023-12-08 16:09:45
 * @LastEditTime: 2024-02-05 14:34:12
 * @FilePath: \car-mall-system\src\components\login-or-register-panel.vue
 * @Description: 
 
-->
<template>
  <div class="login-panel">
    <el-radio-group v-model="role" size="large">
      <el-radio label="buyer" border>我是买家</el-radio>
      <el-radio label="seller" border>我是商家</el-radio>
      <el-radio v-if="activeTab === 'login'" label="admin" border
        >我是管理员</el-radio
      >
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
      :model="registerForm"
      style="max-width: 460px"
      :rules="registerFormRule"
      v-if="props.activeTab === 'register'"
    >
      <el-form-item label="手机号" prop="phone">
        <!-- <el-input v-model.model="registerForm.phone" placeholder="请输入手机号"
          ><template #append>
            <div type="primary">获取验证码</div>
          </template></el-input
        > -->
        <el-input
          v-model="registerForm.phone"
          placeholder="请输入手机号"
        /><el-button
          @click="handleGetCode"
          :loading="isFetching"
          :disabled="isCounting"
          >{{
            isCounting ? `${countdown} s后重新发送验证码` : "获取验证码"
          }}</el-button
        >
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
      <el-button @click="handleSubmit">{{
        props.activeTab === "login" ? "登录" : "注册"
      }}</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import useLoginStore from "../store/login";
import { ElMessage } from "element-plus";
import { getCurrentInstance, ComponentInternalInstance } from "vue";
const { proxy }: ComponentInternalInstance = getCurrentInstance();
import useCountdown from "../hooks/useCountdown";
interface IProps {
  activeTab: string;
}
const props = withDefaults(defineProps<IProps>(), {
  activeTab: "",
});

const emit = defineEmits(["changeToLoginPanel"]);
/* onMounted(()=>{
   clearForm(props.activeTab);
}) */
const role = ref<string>("buyer");
interface loginFormType {
  account: string;
  password: string;
}
const loginForm = reactive<loginFormType>({
  account: "",
  password: null,
});
const loginFormRef = ref<FormInstance>();
let isAccount;
const validateAccount = (rule: any, value: any, callback: any) => {
  if (!isNaN(value)) {
    if (!/^1[3456789]\d{9}$/.test(value)) {
      return callback(new Error("请输入正确的手机号"));
    } else {
      isAccount = false;
      callback();
    }
  } else {
    if (!/^[\u4e00-\u9fa5a-zA-Z]+$/u.test(value)) {
      return callback(new Error("用户名不能包含特殊字符"));
    } else {
      isAccount = true;
      return callback();
    }
  }
};
const loginFormRule = reactive<FormRules<loginFormType>>({
  account: [{ required: true, validator: validateAccount, trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
interface registerFormType {
  phone: string;
  password: string;
  confirmPassword: string;
  code: string;
}
const registerForm = reactive<registerFormType>({
  phone: null,
  password: "",
  confirmPassword: null,
  code: null,
});

const registerFormRef = ref<FormInstance>();
//注册表单的验证
const validatePhone = (rule: any, value: string, callback: any) => {
  if (!/^1[3456789]\d{9}$/.test(value)) {
    return callback(new Error("请输入正确的手机号"));
  } else {
    //这里有个大坑，我函数handleGetCode中的phone验证通过了，但是回调函数一直没能执行，原来是自定义验证规则时没有else
    callback();
  }
};
const validatePassword = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("请输入密码"));
  } else {
    callback();
  }
};
const validateConfirmPassword = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("请输入确认密码"));
  } else {
    if (value !== registerForm.password) {
      return callback(new Error("与第一次密码不同"));
    } else {
      callback();
    }
  }
};
const validateCode = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("请输入验证码"));
  } else {
    callback();
  }
};
const registerFormRule = reactive<FormRules<typeof registerForm>>({
  phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
  password: [{ required: true, validator: validatePassword, trigger: "blur" }],
  confirmPassword: [
    { required: true, validator: validateConfirmPassword, trigger: "blur" },
  ],
  code: [{ required: true, validator: validateCode, trigger: "blur" }],
});
const loginStore = useLoginStore();
const handleSubmit = () => {
  if (props.activeTab === "login") {
    loginFormRef.value.validate((valid) => {
      if (valid) {
        //发送请求，登录成功
        const { account, password } = loginForm;
        const params: {
          password: string;
          role: string;
          account?: string;
          phone?: string;
        } = {
          password,
          role: role.value,
        };
        isAccount ? (params.account = account) : (params.phone = account);
        loginStore.loginAction(params);
      } else {
        ElMessage.error("请检查表单输入是否合法！");
      }
    });
  } else {
    registerFormRef.value.validate(async (valid) => {
      if (valid) {
        const params = { ...registerForm, role: role.value };
        delete params.confirmPassword;
        const res = await proxy.$userApi.register(params);
        if (res.code === 0) {
          registerFormRef.value.resetFields();
          //跳转到loginTab
          emit("changeToLoginPanel");
          if (isCounting) {
            stopCountdown();
          }
        }
      } else {
        ElMessage.error("请检查表单输入是否合法！");
      }
    });
  }
};

/* 获取手机验证码 */
const isFetching = ref(false);
const { countdown, isCounting, startCountdown, stopCountdown } = useCountdown();
const handleGetCode = async () => {
  registerFormRef.value.validateField("phone", async (valid) => {
    if (valid) {
      isFetching.value = true;
      startCountdown();
      const res = await proxy.$userApi.getPhoneCode({
        phone: registerForm.phone,
      });
      if (res.code !== 0) {
        stopCountdown();
      }
      isFetching.value = false;
    } else {
      ElMessage.error("请检查表单输入是否合法！");
    }
  });
};

/* 切换tab时清空注册tab的检验剂数据 */
const clearRegisterForm=()=> {
  registerFormRef.value.resetFields();
}
/* 切换tab时清空登录tab的检验剂数据 */
const clearLoginForm=()=> {
  loginFormRef.value.resetFields();
}
defineExpose({
  clearRegisterForm,
  clearLoginForm,
});
</script>

<style scoped lang="scss"></style>
