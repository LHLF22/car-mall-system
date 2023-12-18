/*
 * @Date: 2023-12-08 09:19:41
 * @LastEditTime: 2023-12-08 11:56:50
 * @FilePath: \car-mall-system\src\api\buyer.ts
 * @Description:用户的api
 */
import { buyer } from "../interface/buyer";
namespace buyerApi {
  export namespace home {
    export const getHomeDataApi = (data: buyer.home.userInfoType) => {
      console.log(data, "getHomeDataApi");
    };
  }
}
export default buyerApi;
