/*
 * @Date: 2023-12-08 09:19:41
 * @LastEditTime: 2024-01-03 17:46:46
 * @FilePath: \car-mall-system\src\api\buyer.ts
 * @Description:用户的api
 */
import http from "../utils/request-utils";
import { buyer } from "../interface/buyer";
namespace buyerApi {
  export namespace home {
    export const getHomeDataApi = (data: buyer.home.userInfoType) => {
      // console.log(data, "getHomeDataApi");
    };
  }
  export namespace layout {
    export const getCarType = () => {
      return http.get("/buyer/carType");
    };
  }
  export namespace category {
    export const getCarCategory = (data:buyer.category.getCarCategoryType) => {
      return http.post("/buyer/carCategorySpecial",data);
    };
  }
  export namespace concret{
    export const getCarConcret = (data:buyer.concret.getCarConcretType) => {
      return http.post("/buyer/carConcretSpecial",data);
    };
  }
}
export default buyerApi;
