<template>
  <el-card class="box-card">
    <div class="fl">
      <el-avatar>{{ loginStore.userInfo.account[0] }}</el-avatar>
    </div>
    <!-- <span>{{ loginStore.userInfo.account }}</span> -->
    <!-- <div class="fl">sanhua</div> -->
    <div  class="fl">
      
       
        <div>
          {{
            loginStore.userInfo.account.length > 10
              ? loginStore.userInfo.account.slice(0, 6)
              : loginStore.userInfo.account
          }}
        </div>
      
    </div>

    <template #footer
      ><el-button>退出登录</el-button><el-button>我的主页</el-button></template
    >
  </el-card>
</template>

<script setup lang="ts">
import useLoginStore from "../store/login";
const loginStore = useLoginStore();
</script>

<style scoped lang="scss">
.el-card {
  width: 228px;
}
</style>
