/*
 * @Date: 2023-12-11 15:04:42
 * @LastEditTime: 2023-12-14 15:07:54
 * @FilePath: \car-mall-system\src\api\login-register.ts
 * @Description:
 */
import http from "../utils/request-utils";
import { loginRegister } from "../interface/login-register";
namespace loginRegisterApi {
  export const login = (data: loginRegister.loginInfoType) => {
    return http.post('/user/login',data)
  };
  export const getPhoneCode = (data: loginRegister.phoneCodeType) => {
    return http.post("/user/code", data);
  };
  export const register=(data:loginRegister.registerInfoType)=>{
    return http.post("/user/register",data)
  }
}
export default loginRegisterApi;
