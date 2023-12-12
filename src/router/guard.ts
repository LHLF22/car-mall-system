/* import router from '.'
import useLoginStore from '../store/login'
import {storeToRefs} from 'pinia'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({showSpinner:false})//进度环显示/隐藏
const whiteList=['/login']
// 全局前置守卫
router.beforeEach((to,from)=>{
  NProgress.start()
  const loginStore=useLoginStore()
  const {role} =storeToRefs(loginStore)
  return true
})
// 全局后置钩子
router.afterEach(() => {
  NProgress.done(true)
})

 */