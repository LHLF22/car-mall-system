/*
 * @Date: 2023-12-08 09:19:41
 * @LastEditTime: 2023-12-28 15:22:59
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
}
export default buyerApi;
