<!--
 * @Date: 2023-12-27 17:40:46
 * @LastEditTime: 2023-12-28 15:37:05
 * @FilePath: \car-mall-system\src\components\buyer\layout\layout-aside.vue
 * @Description: 买家平台的layout布局中的侧栏内容
-->
<template>
  <div class="wrapper">
    <!-- 头部 -->
    <div class="aside-top flSB">
      <!-- 头像 昵称 -->
      <div class="person default">
        <avatar class="m10" />
        <nickname v-if="!layoutStore.isOpen" :show-tooltip="true" />
        <avatarPanel class="avatar-panel" />
      </div>
      <!-- 折叠按钮 消息 -->
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
        <el-button class="m10" text
          ><el-icon><Bell /></el-icon
        ></el-button>
      </div>
    </div>
    <!-- 探索 菜单 -->
    <div
      v-if="!layoutStore.isOpen"
      :class="[route.path === '/home' ? 'active' : 'explore']"
      @click="router.push('/home')"
    >
      <el-icon><Ship /></el-icon>
      <span>探索</span>
    </div>
    <div v-else>
      <el-divider></el-divider>
      <el-tooltip
        effect="dark"
        content="探索"
        placement="bottom"
        :hide-after="0"
      >
        <buttonHighlight :path="'/home'"
          ><el-icon><Ship /></el-icon
        ></buttonHighlight>
      </el-tooltip>
    </div>
    <el-divider></el-divider>
    <!-- 汽车分类 -->
    <transition name="el-fade-in-linear">
      <div v-if="!layoutStore.isOpen">
        <sort
          :data="item"
          v-for="item in carTypeData"
          :key="item.type.id"
        ></sort>
      </div>
      <div v-else>
        <el-tooltip
          effect="dark"
          :content="item.type.tag"
          placement="bottom"
          :hide-after="0"
          v-for="item in carTypeData"
          :key="item.type.id"
        >
          <buttonHighlight :path="`/category/${item.type.id}`"
            ><el-icon><component :is="item.type.icon"></component></el-icon
          ></buttonHighlight>
        </el-tooltip>
      </div>
    </transition>

    <!-- <el-button><elcolor-toggle></elcolor-toggle></el-button> -->
    <!--  <elcolor-toggle></elcolor-toggle> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useLayoutStore from "../../../store/layout";
// import useLoginStore from "../../../store/login";
import avatarPanel from "../../../components/buyer/layout/avatar-panel.vue";
import sort from "../../../components/buyer/layout/sort.vue";
import expandFold from "../../../base-ui/expand-fold.vue";
import avatar from "../../../base-ui/avatar.vue";
import nickname from "../../../base-ui/nickname.vue";
import buttonHighlight from "./button-highlight.vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
import { getCurrentInstance, ComponentInternalInstance } from "vue";
const { proxy }: ComponentInternalInstance = getCurrentInstance();
/* 获取侧栏汽车分类数据 */
let carTypeData = ref<any[]>([]);
proxy.$buyerApi.layout.getCarType().then((res) => {
  carTypeData.value = res.data;
});
const layoutStore = useLayoutStore();
// const loginStore = useLoginStore();
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
.wrapper :hover {
  .fold {
    opacity: 1;
  }
}
.explore {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid var(--el-color-info);
  span {
    padding: 0 10px;
  }
  &:hover {
    background-color: var(--el-color-info-light-8);
  }
}
.active {
  padding: 10px;
  border-radius: 10px;
  span {
    padding: 0 10px;
  }
  background-color: var(--el-color-primary-light-8);
  color: var(--el-color-primary);
}
</style>
