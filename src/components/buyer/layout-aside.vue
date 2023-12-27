<!--
 * @Date: 2023-12-27 17:40:46
 * @LastEditTime: 2023-12-27 17:46:27
 * @FilePath: \car-mall-system\src\components\buyer\layout-aside.vue
 * @Description: 
-->
<template>
  <div class="wrapper">
    <!-- 头部 -->
    <div class="aside-top flSB">
      <!-- 头像 昵称 -->
      <div class="person default">
        <el-avatar class="m10">{{ loginStore.userInfo.account[0] }}</el-avatar>
        <el-tooltip
          effect="light"
          content="折叠面板"
          placement="right-end"
          :hide-after="0"
        >
          <template #content>{{ loginStore.userInfo.account }}</template>
          <span v-if="!layoutStore.isOpen">{{
            loginStore.userInfo.account.length > 10
              ? loginStore.userInfo.account.slice(0, 6)
              : loginStore.userInfo.account
          }}</span>
        </el-tooltip>
        <avatarPanel class="avatar-panel" />
      </div>
      <!-- 折叠面板 消息 -->
      <div :class="[layoutStore.isOpen ? 'smallflex' : 'flex']">
        <el-tooltip
          effect="dark"
          content="折叠面板"
          placement="bottom"
          :hide-after="0"
        >
          <expand-fold
            :class="[layoutStore.isOpen ? 'smallfold' : 'fold', 'm10']"
            :is-text="true"
          ></expand-fold>
        </el-tooltip>
        <el-button class="m10"
          ><el-icon><Bell /></el-icon
        ></el-button>
      </div>
    </div>
    <transition name="el-fade-in-linear">
      <div v-if="!layoutStore.isOpen">
        <sort
          :icon="item.icon"
          :text="item.tag"
          :list="item.list"
          v-for="item in props.data"
          :key="item.tag"
        ></sort>
      </div>
      <div v-else>
        <el-divider></el-divider>
        <el-tooltip
          effect="dark"
          :content="item.tag"
          placement="bottom"
          :hide-after="0"
          v-for="item in props.data"
          :key="item.tag"
        >
          <el-button text class="m10">
            <el-icon><component :is="item.icon"></component></el-icon
          ></el-button>
        </el-tooltip>
      </div>
    </transition>

    <!-- <el-button><elcolor-toggle></elcolor-toggle></el-button> -->
    <!--  <elcolor-toggle></elcolor-toggle> -->
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import useLayoutStore from "../../store/layout";
import useLoginStore from "../../store/login";
const props=defineProps({
  data:{
    type:Object
  }
})
const layoutStore = useLayoutStore();
const loginStore = useLoginStore();
const foldStyle = computed(() => {
  return { opacity: layoutStore.isOpen ? 1 : 0 };
});
</script>

<style scoped lang="scss">
.aside-top {
  margin-bottom: 20px;
  /* 400px时 */
  .fold {
    opacity: 0;
    transition: opacity 0.2s linear;
  }
  /* 64px时 */
  .smallfold {
    opacity: 1;
    transition: opacity 0.2s linear;
  }
  .smallflex {
    display: flex;
    flex-direction: column;
  }
  .person {
    position: relative;
    .avatar-panel {
      position: absolute;
      left: 50px;
      opacity: 0;
      visibility: hidden;
      z-index: 3000;
      transition: opacity 0.2s linear, visibility 0.2s linear;
    }
    &:hover .avatar-panel {
      opacity: 1;
      visibility: visible;
    }
  }
 
}
.wrapper :hover{

    .fold {
      opacity: 1;
    }
  
}
</style>
