/*
 * @Date: 2023-12-05 17:17:03
 * @LastEditTime: 2023-12-27 17:14:50
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
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = "Bearer " + token;
    }
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

http.interceptors.response.use(
  (res) => {
    console.log("响应拦截器=>", res);
    Nprogress.done();
    if (res.status == 200) {
      if (res.data.code != 0) {
        ElMessage.error(res.data.msg);
      }
      return res.data;
    } else {
      return Promise.reject(NETWORK_ERROR);
    }
  },
  (err) => {
    console.log(err, "haha");
    if (err.response.status === 401) {
      localStorage.removeItem("token");
    }
  }
);

export default http;
