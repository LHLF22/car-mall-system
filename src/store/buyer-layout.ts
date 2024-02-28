/*
 * @Date: 2023-12-19 16:48:38
 * @LastEditTime: 2024-02-28 16:00:40
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
// interface tagsType {
//   tag: string[];
//   name: string[];
// }
const useBuyerLayoutStore = defineStore(
  "buyerLayoutStore",
  () => {
    /* 获取侧栏汽车分类数据 */
    let carTypeData = ref<any[]>([]);
    const changeCarTypeData = (data: []) => {
      carTypeData.value = data;
    };
    /* 当前路由 */
    let currentPage = reactive<pageType>({ path: "", title: "" });
    const changeCurrentPage = (page: pageType) => {
      currentPage = page;
    };
    let tags = ref<string[]>([]);
    const deleteTag = (index) => {
      tags.value.splice(index, 1);
      // console.log(tags.value,'delete')
    };
    const addTag = (data) => {
      tags.value.push(data);
      // console.log(tags.value,'add')
    };
    return {
      carTypeData,
      changeCarTypeData,
      currentPage,
      changeCurrentPage,
      tags,
      deleteTag,
      addTag,
    };
  },
  { persist: true } // 启用持久化
);

export default useBuyerLayoutStore;
