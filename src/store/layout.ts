/*
 * @Date: 2023-12-19 16:48:38
 * @LastEditTime: 2024-01-03 17:17:51
 * @FilePath: \car-mall-system\src\store\layout.ts
 * @Description:
 */
// 在需要持久化的仓库启用
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { seller, admin } from "../router/constant";

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
    const defaultTheme = ref("#DD87A1");

    /* 面包屑 */
    const myBread = ref<any[]>([]);

    function initBread() {
      if (myBread.value.length !== 0) return;
      myBread.value = router.getRoutes().filter((el) => el.name === "home");
    }
    //添加面包屑
    function addBread(bread: any) {
      // console.log(myBread.value);
      if (myBread.value.map((el) => el.name).includes(bread.name)) {
        return;
      } else {
        myBread.value.push(bread);
      }
    }
    const router = useRouter();
    //移除面包屑
    function removeBread(bread: any) {
      const index = myBread.value.indexOf(bread);
      if (index !== -1) {
        myBread.value.splice(index, 1);
        //跳转到前一个标签路由
        router.push(myBread.value[myBread.value.length - 1].path);
      } else {
        return;
      }
    }
    return {
      isOpen,
      changeOpen,
      menuColor,
      defaultTheme,
      myBread,
      addBread,
      removeBread,
      initBread,
    };
  },
  { persist: true } // 启用持久化
);

export default useLayoutStore;
