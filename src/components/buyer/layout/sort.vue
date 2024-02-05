<!--
 * @Date: 2023-12-26 15:15:42
 * @LastEditTime: 2024-02-05 11:12:23
 * @FilePath: \car-mall-system\src\components\buyer\layout\sort.vue
 * @Description: 侧栏汽车分类组件
-->
<template>
  <div class="sort">
    <div
      @click="
        router.push(`/category/${props.data.type.id}?name=全部`),
          buyerLayoutStore.changeActiveName('全部')
      "
      class="flSB"
    >
      <div>
        <buttonHighlight
          :is-small-margin="true"
          :is-small="true"
          :path="`/category/${props.data.type.id}?name=全部`"
          :active-name="'全部'"
        >
          <el-icon><component :is="props.data.type.icon"></component></el-icon>
        </buttonHighlight>
        <el-text type="primary" size="small">{{ props.data.type.tag }}</el-text>
      </div>
      <el-icon><ArrowRightBold /></el-icon>
    </div>
    <div class="flex">
      <div v-for="(item, index) in props.data.list" :key="item.id">
        <buttonHighlight
          :path="`/category/${props.data.type.id}?name=${item.name}`"
          :active-name="item.name"
          :is-small-margin="true"
          :is-small="true"
          >{{ item.name }}</buttonHighlight
        >
        <span
          class="divider"
          v-if="index !== props.data.list.length - 1"
          style="color: rgb(209, 200, 200)"
          >|</span
        >
        <!-- <el-divider direction="vertical" border-style="dashed" v-if="index !== props.data.list.length - 1"/> -->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import buttonHighlight from "./button-highlight.vue";
import { useRoute, useRouter } from "vue-router";
import useBuyerLayoutStore from "../../../store/buyer-layout";
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
const buyerLayoutStore = useBuyerLayoutStore();
</script>

<style scoped lang="scss">
.sort {
  margin: 8px 0;
}
</style>
