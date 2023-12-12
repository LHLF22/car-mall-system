import axios from 'axios'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus'

const http=axios.create({
  baseURL:'',
  timeout:20*1000
})
const NETWORK_ERROR='网络错误，请联系开发人员'

/**
 * 请求拦截器
 */
http.interceptors.request.use((req)=>{
  console.log('请求拦截器=>',req)
  Nprogress.start()
  return req
},(error)=>{
  Nprogress.done()
  return Promise.reject(error)
})

/**
 * 响应拦截器
 */

http.interceptors.response.use((res)=>{
  console.log('响应拦截器=>',res)
  Nprogress.done()
  if(res.status==200){
    return res.data
  }else{
    ElMessage.error((NETWORK_ERROR))
    return Promise.reject(NETWORK_ERROR)
  }
})

export default http