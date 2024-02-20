/*
 * @Date: 2023-12-05 17:53:15
 * @LastEditTime: 2023-12-05 17:53:24
 * @FilePath: \car-mall-system\src\hooks\useLoading.ts
 * @Description:
 */
// useLoading.ts
import { ElLoading } from "element-plus";

let loading: { close: () => void };
const openLoading=()=> {
  loading = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
}
const closeLoading=()=> {
  loading.close();
}
export { openLoading, closeLoading };
