<!--
 * @Date: 2023-12-27 12:00:38
 * @LastEditTime: 2023-12-27 17:37:58
 * @FilePath: \car-mall-system\src\views\buyer\Layout.vue
 * @Description: 买家平台的layout布局
-->
<template>
  <div class="Home">
    <el-container class="wrapper">
      <el-aside
        class="animate-menu"
        :width="layoutStore.isOpen ? '90px' : '400px'"
      >
        <!-- 头部 -->
        <div class="aside-top flSB">
          <!-- 头像 昵称 -->
          <div class="person default">
            <el-avatar class="m10">{{loginStore.userInfo.account[0]}}</el-avatar>
            <el-tooltip
              effect="light"
              content="折叠面板"
              placement='right-end'
              :hide-after="0"
            >
              <template #content>{{ loginStore.userInfo.account }}</template>
              <span v-if="!layoutStore.isOpen">{{
                loginStore.userInfo.account.length > 10
                  ? loginStore.userInfo.account.slice(0, 6)
                  : loginStore.userInfo.account
              }}</span>
            </el-tooltip>
            <avatarPanel class="avatar-panel"/>
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
            <el-button class="m10"><el-icon><Bell /></el-icon></el-button>
          </div>
        </div>
        <transition name="el-fade-in-linear">
          <div v-if="!layoutStore.isOpen">
            <sort
              :icon="item.icon"
              :text="item.tag"
              :list="item.list"
              v-for="item in carTypeData"
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
              v-for="item in carTypeData"
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
      </el-aside>
      <el-main>
        <!-- 中间的 嵌套路由-->
        <router-view v-slot="{ Component, route }">
          <transition name="fade-transform" mode="out-in">
            <keep-alive>
              <component :is="Component" :key="route.path" />
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed,reactive,ref,onMounted ,watch} from "vue";
import sort from "../../components/buyer/sort.vue";
import elcolorToggle from "../../components/elcolor-toggle.vue";
import avatarPanel from "../../components/avatar-panel.vue";
import useLoginStore from "../../store/login";
import expandFold from "../../components/expand-fold.vue";
import useLayoutStore from "../../store/layout";
import { getCurrentInstance, ComponentInternalInstance } from "vue";
const { proxy }: ComponentInternalInstance = getCurrentInstance();
const layoutStore = useLayoutStore();
const loginStore = useLoginStore();
const foldStyle = computed(() => {
  return { opacity: layoutStore.isOpen ? 1 : 0 };
});
/* 获取侧栏汽车分类数据 */
let carTypeData=ref<any[]>([])
proxy.$buyerApi.layout.getCarType().then(res=>{
  carTypeData.value=res.data
})
</script>

<style scoped lang="scss">
.el-container.wrapper {
  height: 100vh;
}
.el-aside {
  border-right: 1px solid #ccc;
  padding: 25px 15px;
  overflow: visible;
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

  &:hover {
    .fold {
      opacity: 1;
    }
  }
}
.el-main {

  height: 70vh;
  overflow-y: auto;
  @include scrollbar();
}
</style>
