<template>
  <div class="login-out fl">
    <div class="p20"><el-avatar
      :size="45"
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    /></div>
    
    <el-dropdown trigger="click" @command="handleCommand">
      <div>
        <span>{{ loginStore.userInfo.account }}</span>
        <el-icon>
          <arrow-down />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="House" command="a">
            个人中心
          </el-dropdown-item>
          <el-dropdown-item :icon="Close" divided command="b"
            >退出登录</el-dropdown-item
          >

          <!-- <el-dropdown-item :icon="CirclePlus"></el-dropdown-item>
          <el-dropdown-item :icon="Check">Action 4</el-dropdown-item>
          <el-dropdown-item :icon="CircleCheck">Action 5</el-dropdown-item> -->
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowDown,
  Check,
  CircleCheck,
  CirclePlus,
  CirclePlusFilled,
  House,
  Close,
  Plus,
} from "@element-plus/icons-vue";
import useLoginStore from "../../store/login";
const loginStore = useLoginStore();
function handleCommand(command: string) {
  if (command === "a") {
  } else if (command === "b") {
    console.log(command);
    loginStore.loginOut();
  }
}
</script>

<style scoped lang="scss"></style>
