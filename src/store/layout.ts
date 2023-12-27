/*
 * @Date: 2023-12-19 16:48:38
 * @LastEditTime: 2023-12-20 09:51:22
 * @FilePath: \car-mall-system\src\store\layout.ts
 * @Description:
 */
// 在需要持久化的仓库启用
import { defineStore } from "pinia";
import { ref } from "vue";
 const useLayoutStore = defineStore(
  "layout",
  () => {
    /* 控制侧栏菜单的开关 */
    const isOpen = ref(false);
    function changeOpen() {
      isOpen.value = !isOpen.value;
    }

    /*  与layout/index.vue中的.el-aside的颜色一致 */
    const menuColor = ref("#fceff3");

    /* 保存颜色选择器的颜色 */
    const defaultTheme=ref('#405DFF')
    return {
      isOpen,
      changeOpen,
      menuColor,
      defaultTheme
    };
  },
  { persist: true } // 启用持久化
);

export default useLayoutStore
