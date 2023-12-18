/*
 * @Date: 2023-12-05 17:17:03
 * @LastEditTime: 2023-12-14 14:43:18
 * @FilePath: \car-mall-system\src\utils\request-utils.ts
 * @Description:
 */
import axios from "axios";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import { ElMessage } from "element-plus";
import { AxiosResponse } from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 20 * 1000,
});
const NETWORK_ERROR = "网络错误，请联系开发人员";

/**
 * 请求拦截器
 */
http.interceptors.request.use(
  (req) => {
    console.log("请求拦截器=>", req);
    Nprogress.start();
    // req.headers.Authorization='Bearer'+localStorage.getItem('token')
    return req;
  },
  (error) => {
    Nprogress.done();
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 */

http.interceptors.response.use((res) => {
  console.log("响应拦截器=>", res);
  Nprogress.done();
  if (res.status == 200) {
    if(res.data.code===0){
      ElMessage.success(res.data.msg);
    }else{
      ElMessage.error(res.data.msg);
    }
    
    return res.data
  } else {
    // ElMessage.error((NETWORK_ERROR))
    // ElMessage.error(res.data.msg);
    return Promise.reject(NETWORK_ERROR)
  }
});

export default http;
