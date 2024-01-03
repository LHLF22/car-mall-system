/*
 * @Date: 2023-12-08 09:13:09
 * @LastEditTime: 2024-01-03 17:37:34
 * @FilePath: \car-mall-system\src\interface\buyer.ts
 * @Description: api中user端下的api的请求参数类型
 */
export namespace buyer {
  export namespace home {
    export interface userInfoType {
      account: string;
      id: number;
    }
  }
  export namespace category {
    export interface getCarCategoryType {
      id: number;
    }
  }
  export namespace concret {
    export interface getCarConcretType {
      id: number;
    }
  }
}
