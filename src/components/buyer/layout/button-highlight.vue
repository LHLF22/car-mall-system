<!--
 * @Date: 2023-12-28 15:25:41
 * @LastEditTime: 2024-02-20 10:40:50
 * @FilePath: \car-mall-system\src\components\buyer\layout\button-highlight.vue
 * @Description: 侧栏页面中点击会跳转路由的带icon的按钮，为当前路由时显示高亮
-->
<template>
  <el-button
    @click="buttomClick"
    :type="isActive ? 'primary' : ''"
    :class="[props.isSmallMargin ? 'm2' : 'm10']"
    :text="!isActive"
    :size="props.isSmall ? 'small' : 'default'"
  >
    <slot></slot>
  </el-button>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import useBuyerLayoutStore from "../../../store/buyer-layout";
interface IProps {
  // path: string;
  isSmall?: boolean;
  isSmallMargin?: boolean;
  // activeName?: string;
  buttonName?: string;
}
const props = withDefaults(defineProps<IProps>(), {
  path: "",
  isSmall: false,
  isSmallMargin: false,
  activeName: "",

  buttonName: "",
});

const route = useRoute();
const router = useRouter();
const buyerLayoutStore = useBuyerLayoutStore();
const isActive = ref(false);
const types = buyerLayoutStore.carTypeData.map((el) => el.type.tag);//['车身类型', '品牌和制造商', '价格范围']
/* 
0
: 
(15) ['轿车', 'SUV', '跑车', '微型车', '小型车', '紧凑型车', '中型车', '中大型车', '大型车', 'MPV', '微卡', '皮卡', '高端皮卡', '中型MPV', '车身类型']
1
: 
(10) ['奥迪', '宝马', '奔驰', '大众', '丰田', '本田', '比亚迪', '吉利汽车', '福特', '品牌和制造商']
2
: 
(11) ['经济型车', '中档车', '豪 */
const buttons = buyerLayoutStore.carTypeData.map((el) => {
  return [...el.list.map((e) => e.name), el.type.tag];
});
// console.log(buttons, "llll");
//处理相同按钮点击
const dealFirst = (type) => {
  const index = buyerLayoutStore.oldTags[type].findIndex(
    (el) => el === props.buttonName
  );
  console.log(index,'index')
  if (index !== -1) {
    console.log('222')
    isActive.value = false;
    console.log(isActive.value,'??')
    buyerLayoutStore.deleteTags(type, index);
    return;
  }
};

const buttomClick = () => {
  console.log(buyerLayoutStore.oldTags,'buyerLayoutStore.oldTags')
  console.log(types,'type')
  console.log(props.buttonName,'buttonName')
  router.push("/category");
  //1.不管点击主要还是次要，只要oldTags中包含这一项，那么isActive.value = false,并从oldTags中剔除
  //2.点击了次要分类，但次要分类与次要分类的主要分类互斥：剔除之前的这个主要分类，新增这个次要分类，并isActive.value = true
  //2.1上述不管点击主要还是次要，都是一样的
  //3.只要我当前不在oldTags中，我就是暗的->这个应该是computed或者watch
  /*  const index = buyerLayoutStore.oldTags.findIndex(
    (el) => el.type === props.buttonName || el.tag === props.buttonName
  );
  if (index !== -1) {
    isActive.value = false;
    buyerLayoutStore.deleteTags(index);
    return
  } */
  //点击的是主要分类
  if (types.indexOf(props.buttonName) !== -1) {
    console.log('1')
    if(buyerLayoutStore.oldTags["tag"].length===0){
      buyerLayoutStore.addTags("tag", props.buttonName);
      return
    }
    dealFirst("tag");
    //这个主要分类下的所有次要分类
    const button = buttons.filter((el) => el.includes(props.buttonName));
    //判断当前oldTags中是否有这个主要分类下的次要分类存在
    const index = buyerLayoutStore.oldTags["name"].findIndex((el) =>
      button[0].includes(el)
    );
    if (index !== -1) {
      buyerLayoutStore.deleteTags("name", index);
      buyerLayoutStore.addTags("tag", props.buttonName);
      isActive.value = true;
    } else {
      buyerLayoutStore.addTags("tag", props.buttonName);
      isActive.value = true;
    }
  } else {
    if(buyerLayoutStore.oldTags["name"].length===0){
      buyerLayoutStore.addTags("name", props.buttonName);
      return
    }
    dealFirst("name");
    const button = buttons.filter((el) => el.includes(props.buttonName));
    const index = buyerLayoutStore.oldTags["tag"].findIndex(
      (el) => el === button[0][button[0].length - 1]
    );
    if (index !== -1) {
      buyerLayoutStore.deleteTags("tag", index);
      buyerLayoutStore.addTags("name", props.buttonName);
      isActive.value = true;
    } else {
      buyerLayoutStore.addTags("name", props.buttonName);
      isActive.value = true;
    }
  }

  // isActive.value = !isActive.value;
};

// console.log(buttons, "kkk");
const dealParams = () => {
  /* 
if(types.map(el=>el.list).indexOf(props.buttonName)!==-1){
//点击的是主要分类
}else{

} */
};
</script>

<style scoped lang="scss">
.m2 {
  margin: 4px;
}
</style>
