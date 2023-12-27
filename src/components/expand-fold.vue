<!--
 * @Date: 2023-12-26 16:04:02
 * @LastEditTime: 2023-12-26 17:51:27
 * @FilePath: \car-mall-system\src\components\expand-fold.vue
 * @Description: 
-->
<template>
  <div class="expand-fold">
   <!--  <component :is="isButton?'el-button':'div'" :text="props.isText" @click="layoutStore.changeOpen" type="primary"
      ><el-icon><component :is="iconComponent"></component></el-icon
    ></component> -->
    <el-button :text="props.isText" @click="layoutStore.changeOpen" type="primary"
      ><el-icon><component :is="iconComponent"></component></el-icon
    ></el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch,markRaw } from "vue";
import { Expand, Fold } from "@element-plus/icons-vue";
import useLayoutStore from "../store/layout";
const props = defineProps({
  isText: {
    type: Boolean,
    default: false,
  },
 /*  isButton:{
    type:Boolean,
    default:true
  } */
});
/* 控制侧栏折叠 */
//折叠开关图标
/* 您收到的警告信息表示一个 Vue 组件被转化为了一个响应式对象，这可能会导致不必要的性能开销。为了解决这个问题，您可以使用 markRaw 函数或者使用 shallowRef 替代 ref。
markRaw 函数用于标记一个对象，告诉 Vue 不需要将其转换为响应式对象。您可以在使用 ref 创建响应式对象时，通过 markRaw 来标记那些不需要被转换为响应式的组件。 */
const iconComponent = ref(markRaw(Expand));
const layoutStore = useLayoutStore();
watch(
  () => layoutStore.isOpen,
  (newVal) => {
    iconComponent.value = newVal ? markRaw(Expand) : markRaw(Fold);
  }
);
</script>

<style scoped lang="scss"></style>
