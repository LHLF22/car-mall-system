/*
 * @Date: 2023-12-11 15:05:02
 * @LastEditTime: 2023-12-14 14:16:49
 * @FilePath: \car-mall-system\src\interface\login-register.ts
 * @Description:
 */
export namespace loginRegister {
  export interface loginInfoType {
    account: string;
    password: string;
  }
  export interface phoneCodeType {
    phone: string;
  }
  export interface registerInfoType {
    phone: string;
    password:string,
    role:string,
    code:string
  }
}
