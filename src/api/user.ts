/*
 * @Date: 2023-12-08 09:19:41
 * @LastEditTime: 2023-12-08 11:56:50
 * @FilePath: \car-mall-system\src\api\user.ts
 * @Description:用户的api
 */
import { user } from "../interface/user"
namespace userApi {
  export namespace home {
    export const getHomeDataApi = (data: user.home.userInfoType) => {
      console.log(data, "getHomeDataApi");
    };
  }
}
export default userApi;
