/*
 * @Date: 2023-12-11 15:05:02
 * @LastEditTime: 2024-01-02 16:51:52
 * @FilePath: \car-mall-system\src\interface\user.ts
 * @Description:
 */
export namespace user {
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
  export interface editAccountType {
    account: string;
    id: number;
    role: string;
  }
  export interface editPasswordType {
    password: string;
    id: number;
  }
  export interface editGenderType {
    gender: string;
    id: number;
  }
  export interface editIntroductionType {
    introduction: string;
    id: number;
  }
}
