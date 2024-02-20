/*
 * @Date: 2023-12-19 16:48:38
 * @LastEditTime: 2024-02-20 10:46:21
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
interface tagsType {
  tag: string[];
  name: string[];
}
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

    // let oldTags=ref<Array<{type?:string,tag?:string}>>([])
    let oldTags = ref<tagsType>({ tag: ['1'], name: ['2'] });

    const deleteTags = (type, index) => {
      oldTags.value[type].splice(index, 1);
      console.log(oldTags.value, "delete oldTags");
    };
    const addTags = (type, data) => {
      oldTags.value[type].push(data);
      console.log(oldTags.value, "add oldTags");
    };
    return {
      carTypeData,
      changeCarTypeData,
      currentPage,
      changeCurrentPage,
      oldTags,
      addTags,
      deleteTags,
      // activeName,
      // changeActiveName,
    };
  },
  { persist: true } // 启用持久化
);

export default useBuyerLayoutStore;
