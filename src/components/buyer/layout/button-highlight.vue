<!--
 * @Date: 2023-12-28 15:25:41
 * @LastEditTime: 2024-02-29 11:44:29
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
  buttonInfo?: any;
}
const props = withDefaults(defineProps<IProps>(), {
  path: "",
  isSmall: false,
  isSmallMargin: false,
  activeName: "",
  buttonInfo: { name: "", tag: "" },
});

const router = useRouter();
const buyerLayoutStore = useBuyerLayoutStore();
const isActive = ref(false);
const buttons = buyerLayoutStore.carTypeData.map((el) => {
  return [...el.list.map((e) => e.name)];
});
watchEffect(() => {
  const indexFirst = buyerLayoutStore.tags
    .map((el) => el.name)
    .includes(props.buttonInfo.name);
  if (indexFirst) {
    isActive.value = true;
  } else {
    isActive.value = false;
  }
});

const buttonClick = () => {
  router.push("/category");
  /* 若tags为空，则直接加入tags */
  if (buyerLayoutStore.tags.length === 0) {
    buyerLayoutStore.addTag(props.buttonInfo);
    return;
  }
  /* 点击存在的那一项，则是取消这一项 */
  const indexF = buyerLayoutStore.tags.findIndex(
    (el) => el.name === props.buttonInfo.name
  );
  if (indexF !== -1) {
    buyerLayoutStore.deleteTag(indexF);
    return;
  }
  /* 互斥操作 */
  const button = buttons.filter((el) => el.includes(props.buttonInfo.name));
  const index = buyerLayoutStore.tags.findIndex((el) =>
    button[0].includes(el.name)
  );
  if (index !== -1) {
    buyerLayoutStore.deleteTag(index);
    buyerLayoutStore.addTag(props.buttonInfo);
  } else {
    buyerLayoutStore.addTag(props.buttonInfo);
  }
};
</script>

<style scoped lang="scss">
.m2 {
  margin: 4px;
}
</style>
