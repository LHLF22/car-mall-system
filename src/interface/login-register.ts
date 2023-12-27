/*
 * @Date: 2023-12-11 15:05:02
 * @LastEditTime: 2023-12-19 10:33:02
 * @FilePath: \car-mall-system\src\interface\login-register.ts
 * @Description:
 */
export namespace loginRegister {
  export interface loginInfoType {
    password: string;
    role: string;
    account?: string;
    phone?: string;
  }
  export interface phoneCodeType {
    phone: string;
  }
  export interface registerInfoType {
    phone: string;
    password: string;
    role: string;
    code: string;
  }
}
