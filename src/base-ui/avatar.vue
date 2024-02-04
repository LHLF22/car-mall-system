<!--
 * @Date: 2023-12-28 10:08:44
 * @LastEditTime: 2023-12-29 15:39:04
 * @FilePath: \car-mall-system\src\base-ui\avatar.vue
 * @Description: 
-->
<template>
  <el-avatar :size="props.avatarSize" class="avatar">{{loginStore.userInfo.account[0] }}</el-avatar>
</template>
<script setup lang="ts">
import useLoginStore from "../store/login";
const loginStore = useLoginStore();
interface IProps {
  avatarSize?: number;
}
const props = withDefaults(defineProps<IProps>(), {
  avatarSize: 40,
});
</script>
<style scoped lang="scss">
.avatar {
  background-color: var(--el-color-primary);
}
</style>
