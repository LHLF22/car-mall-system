<!--
 * @Date: 2023-12-28 10:08:53
 * @LastEditTime: 2023-12-28 10:34:12
 * @FilePath: \car-mall-system\src\base-ui\nickname.vue
 * @Description: 
-->
<template>
  <div v-if="!props.showTooltip">
    {{
      loginStore.userInfo.account.length > 10
        ? loginStore.userInfo.account.slice(0, 6)
        : loginStore.userInfo.account
    }}
  </div>
  <el-tooltip v-else effect="light" placement="right-end" :hide-after="0">
    <template #content>{{ loginStore.userInfo.account }}</template>
    <span>{{
      loginStore.userInfo.account.length > 10
        ? loginStore.userInfo.account.slice(0, 6)
        : loginStore.userInfo.account
    }}</span>
  </el-tooltip>
</template>

<script setup lang="ts">
import useLoginStore from "../store/login";
const loginStore = useLoginStore();
import useLayoutStore from "../store/layout";
const layoutStore = useLayoutStore();
interface IProps {
  showTooltip:boolean
}
// 2.定义默认值
const props = withDefaults(defineProps<IProps>(), {
  showTooltip:false
});
</script>

<style scoped lang="scss"></style>
