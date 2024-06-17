import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";// 持久化插件
import chokidar from 'chokidar'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.mount('#app')

// Watch the file
const watcher = chokidar.watch('E:/chengliu/work/vue3/sha.txt', {
  persistent: true,
  ignoreInitial: true
})

watcher.on('change', (path) => {
  console.log(`File ${path} has changed`)
  // Trigger a re-render of the Vue component
  app.$forceUpdate()
})
