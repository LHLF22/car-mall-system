// import type { App } from 'vue'; 
import { createPinia } from "pinia";
import piniaPersist from 'pinia-plugin-persistedstate'
const store =createPinia()
store.use(piniaPersist)
//我不太理解下面这个代码，应该跟在main.ts中引入后注册一样
/* export function useStore(app: App<Element>) {
  app.use(store);
} */
export default store
