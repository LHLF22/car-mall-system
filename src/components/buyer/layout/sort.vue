<!--
 * @Date: 2023-12-26 15:15:42
 * @LastEditTime: 2023-12-28 16:15:03
 * @FilePath: \car-mall-system\src\components\buyer\layout\sort.vue
 * @Description: 侧栏汽车分类组件
-->
<template>
  <div class="sort flex">
    <buttonHighlight :is-small-margin="true" :is-small="true" :path="`/category/${props.data.type.id}`"
      ><el-icon><component :is="props.data.type.icon"></component></el-icon
    ></buttonHighlight>
    <el-text type="primary" size="small">{{ props.data.type.tag }} :</el-text>
    <div v-for="(item, index) in props.data.list" :key="item.id">
      <buttonHighlight
        :is-small-margin="true"
        :is-small="true"
        :path="`/concret/${item.id}`"
        >{{ item.name }}</buttonHighlight
      >
      <span class="divider" v-if="index !== props.data.list.length - 1">/</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import buttonHighlight from "./button-highlight.vue";
import { useRouter } from "vue-router";
interface listType {
  id: number;
  name: string;
}
interface tagType {
  id: number;
  tag: string;
  icon: string;
}
// 1.定义props类型
interface IProps {
  data: { list: listType[]; type: tagType };
}
// 2.定义默认值
const props = withDefaults(defineProps<IProps>(), {
  data: () => ({ list: [], type: { id: null, tag: "", icon: "" } }),
});
const router = useRouter();
</script>

<style scoped lang="scss">
.sort {
  margin: 8px 0;
}
</style>
