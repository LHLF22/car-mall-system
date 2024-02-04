/*
 * @Date: 2023-12-05 17:17:03
 * @LastEditTime: 2024-01-04 14:32:16
 * @FilePath: \car-mall-system\src\utils\request-utils.ts
 * @Description:
 */
import axios from "axios";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import { ElMessage } from "element-plus";
import { AxiosResponse } from "axios";
// import { useRouter } from "vue-router";
// const router=useRouter()
import router from "@/router/index";

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
    // console.log("请求拦截器=>", req);
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
    // console.log("响应拦截器=>", res);
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
      localStorage.clear();
      router.push("/login");
      ElMessage.error("登录超时，请重新登录！");
    }
  }
);

export default http;
