/*
 * @Date: 2023-12-19 16:48:38
 * @LastEditTime: 2023-12-29 11:37:32
 * @FilePath: \car-mall-system\src\store\buyer-layout.ts
 * @Description:
 */
// 在需要持久化的仓库启用
import { defineStore } from "pinia";
import { ref,reactive } from "vue";
interface pageType {
  path: string;
  title: string;
}
const useBuyerLayoutStore = defineStore(
  "layout",
  () => {
    
    let currentPage = reactive<pageType>({path:'',title:''});
    function changeCurrentPage(page: pageType) {
      currentPage = page;
    }
    return {
      currentPage,
      changeCurrentPage,
    };
  },
  { persist: true } // 启用持久化
);

export default useBuyerLayoutStore;
