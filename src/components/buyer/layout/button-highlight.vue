<!--
 * @Date: 2023-12-28 15:25:41
 * @LastEditTime: 2024-02-20 15:05:10
 * @FilePath: \car-mall-system\src\components\buyer\layout\button-highlight.vue
 * @Description: 侧栏页面中点击会跳转路由的带icon的按钮，为当前路由时显示高亮
-->
<template>
  <el-button
    @click="buttonClick"
    :type="isActive ? 'primary' : ''"
    :class="[props.isSmallMargin ? 'm2' : 'm10']"
    :text="!isActive"
    :size="props.isSmall ? 'small' : 'default'"
  >
    <slot></slot>
  </el-button>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import useBuyerLayoutStore from "../../../store/buyer-layout";
interface IProps {
  isSmall?: boolean;
  isSmallMargin?: boolean;
  buttonName?: string;
}
const props = withDefaults(defineProps<IProps>(), {
  path: "",
  isSmall: false,
  isSmallMargin: false,
  activeName: "",
  buttonName: "",
});

const router = useRouter();
const buyerLayoutStore = useBuyerLayoutStore();
const isActive = ref(false);
// const types = buyerLayoutStore.carTypeData.map((el) => el.type.tag);
const buttons = buyerLayoutStore.carTypeData.map((el) => {
  return [...el.list.map((e) => e.name), el.type.tag];
});
watchEffect(() => {
  const indexFirst = buyerLayoutStore.tags.includes(props.buttonName);
  if (indexFirst) {
    isActive.value = true;
  } else {
    isActive.value = false;
  }
});

const buttonClick = () => {
  router.push("/category");
  if (buyerLayoutStore.tags.length === 0) {
    buyerLayoutStore.addTag(props.buttonName);
    return;
  }
  const indexF = buyerLayoutStore.tags.findIndex(
    (el) => el === props.buttonName
  );
  if (indexF !== -1) {
    buyerLayoutStore.deleteTag(indexF);
    return;
  }
  const button = buttons.filter((el) => el.includes(props.buttonName));
  const index = buyerLayoutStore.tags.findIndex((el) => button[0].includes(el));
  if (index !== -1) {
    buyerLayoutStore.deleteTag(index);
    buyerLayoutStore.addTag(props.buttonName);
  } else {
    buyerLayoutStore.addTag(props.buttonName);
  }
};
</script>

<style scoped lang="scss">
.m2 {
  margin: 4px;
}
</style>
