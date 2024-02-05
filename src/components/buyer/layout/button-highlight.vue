<!--
 * @Date: 2023-12-28 15:25:41
 * @LastEditTime: 2024-02-05 10:35:29
 * @FilePath: \car-mall-system\src\components\buyer\layout\button-highlight.vue
 * @Description: 侧栏页面中点击会跳转路由的带icon的按钮，为当前路由时显示高亮
-->
<template>
  <el-button
    @click="
      router.push(props.path),
        buyerLayoutStore.changeActiveName(props.activeName)
    "
    :type="light"
    :class="[props.isSmallMargin ? 'm2' : 'm10']"
    :text="text"
    :size="props.isSmall ? 'small' : 'default'"
  >
    <slot></slot>
  </el-button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import useBuyerLayoutStore from "../../../store/buyer-layout";
interface IProps {
  path: string;
  isSmall?: boolean;
  isSmallMargin?: boolean;
  activeName?: string;
}
const props = withDefaults(defineProps<IProps>(), {
  path: "",
  isSmall: false,
  isSmallMargin: false,
  activeName: "",
});

const route = useRoute();
const router = useRouter();
const buyerLayoutStore = useBuyerLayoutStore()

const light = computed(() => {
  if (props.path.includes("/category/") && route.path.includes("/category/")) {
    if (props.activeName === "全部") {
      return props.path.split("/")[2][0] === route.path.split("/")[2][0]
        ? "primary"
        : "";
    } else {
      return props.path.split("/")[2][0] === route.path.split("/")[2][0] &&
        props.activeName === buyerLayoutStore.activeName
        ? "primary"
        : "";
    }
  } else {
    return props.path === route.path ? "primary" : "";
  }
});

const text = computed(() => {
  if (props.path.includes("/category/") && route.path.includes("/category/")) {
    if (props.activeName === "全部") {
      return !(props.path.split("/")[2][0] === route.path.split("/")[2][0]);
    } else {
      return !(
        props.path.split("/")[2][0] === route.path.split("/")[2][0] &&
        props.activeName === buyerLayoutStore.activeName
      );
    }
  } else {
    return !(props.path === route.path);
  }
});

</script>

<style scoped lang="scss">
.m2 {
  margin: 4px;
}
</style>
