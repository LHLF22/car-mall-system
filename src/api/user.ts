/*
 * @Date: 2023-12-11 15:04:42
 * @LastEditTime: 2024-01-02 17:02:25
 * @FilePath: \car-mall-system\src\api\user.ts
 * @Description:
 */
import http from "../utils/request-utils";
import { user } from "../interface/user";
namespace userApi {
  /* 登录 */
  export const login = (data: user.loginInfoType) => {
    return http.post("/user/login", data);
  };
  /* 获取验证码 */
  export const getPhoneCode = (data: user.phoneCodeType) => {
    return http.post("/user/code", data);
  };
  /* 注册 */
  export const register = (data: user.registerInfoType) => {
    return http.post("/user/register", data);
  };
  /* 修改用户名*/
  export const editAccount = (data: user.editAccountType) => {
    return http.post("/user/username", data);
  };
  /* 修改密码*/
  export const editPassword = (data: user.editPasswordType) => {
    return http.post("/user/password", data);
  };
   /* 修改性别*/
   export const editGender = (data: user.editGenderType) => {
    return http.post("/user/gender", data);
  };
   /* 修改密码*/
   export const editIntroduction = (data: user.editIntroductionType) => {
    return http.post("/user/introduction", data);
  };
}
export default userApi;
