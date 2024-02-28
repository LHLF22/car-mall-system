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
