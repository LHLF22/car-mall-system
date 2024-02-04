/*
 * @Date: 2023-12-19 16:48:38
 * @LastEditTime: 2024-02-04 14:40:05
 * @FilePath: \car-mall-system\src\store\buyer-layout.ts
 * @Description:
 */
// 在需要持久化的仓库启用
import { defineStore } from "pinia";
import { ref, reactive } from "vue";
interface pageType {
  path: string;
  title: string;
}
const useBuyerLayoutStore = defineStore(
  "buyerLayoutStore",
  () => {
    /* 当前路由 */
    let currentPage = reactive<pageType>({ path: "", title: "" });
    function changeCurrentPage(page: pageType) {
      currentPage = page;
    }

    /* 当前标签页 */
    let activeName = ref<string>("全部");
    function changeActiveName(name: string) {
      activeName.value = name;
    }
    return {
      currentPage,
      changeCurrentPage,
      activeName,
      changeActiveName,
    };
  },
  { persist: true } // 启用持久化
);

export default useBuyerLayoutStore;
