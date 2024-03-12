/*
 * @Date: 2024-02-28 14:57:18
 * @LastEditTime: 2024-02-28 17:42:35
 * @FilePath: \car-mall-system\src\utils\format.ts
 * @Description:
 */
export const priceFormat = (price) => {
  const priceNow = parseInt(price) / 10000;
  if (priceNow < 8) {
    return "小于8万";
  } else if (priceNow < 10) {
    return "8-10万";
  } else if (priceNow < 15) {
    return "10-15万";
  } else if (priceNow < 20) {
    return "15-20万";
  } else if (priceNow < 30) {
    return "20-30万";
  } else if (priceNow < 50) {
    return "30-50万";
  } else {
    return "50万以上";
  }
};
//车身类型、价格范围、品牌与制造商 对应返回 carType、priceRange、brand
export const tagFormat=(tag)=>{
  if(tag==='车身类型'){
    return 'carType'
  }else if(tag==='价格范围'){
    return 'priceRange'
  }else if(tag==='品牌和制造商'){
    return 'brand'
  }
}
