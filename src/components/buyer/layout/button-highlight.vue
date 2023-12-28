<!--
 * @Date: 2023-12-28 15:25:41
 * @LastEditTime: 2023-12-28 16:16:00
 * @FilePath: \car-mall-system\src\components\buyer\layout\button-highlight.vue
 * @Description: 侧栏页面中点击会跳转路由的带icon的按钮，为当前路由时显示高亮
-->
<template>
  <el-button
    @click="router.push(props.path)"
    :type="route.path === props.path ? 'primary' : ''"
    :class="[props.isSmallMargin?'m2':'m10']"
    :text="route.path !== props.path"
    :size="props.isSmall?'small':'default'"
  >
    <slot></slot>
  </el-button>
</template>

<script setup lang="ts">
interface IProps {
  path: string;
  isSmall?:boolean
  isSmallMargin?:boolean
}
const props = withDefaults(defineProps<IProps>(), {
  path: "",
  isSmall:false,
  isSmallMargin:false
});

import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
</script>

<style scoped lang="scss">
.m2{
  margin:4px;
}
</style>
