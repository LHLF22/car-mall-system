<template>
  <div class="login-out fl">
    <div class="p20">
      <avatar/>
    </div>

    <el-dropdown trigger="click" @command="handleCommand">
      <div class="fl">
        <nickname :show-tooltip="true"/>
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
import { ArrowDown, House, Close } from "@element-plus/icons-vue";
import useLoginStore from "../../store/login";
import avatar from "../../base-ui/avatar.vue";
import nickname from "../../base-ui/nickname.vue";
import {useRouter} from 'vue-router'
const router=useRouter()
const loginStore = useLoginStore();
function handleCommand(command: string) {
  if (command === "a") {
    router.push('/person')
  } else if (command === "b") {
    loginStore.loginOut();
  }
}
</script>

<style scoped lang="scss"></style>
