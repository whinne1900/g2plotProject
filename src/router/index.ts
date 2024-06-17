import { createWebHashHistory, createRouter } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import testReadFile from '@/views/test/demo.vue'
import myG2plot from '@/views/MyG2plot.vue'

const routes = [
  { 
    path: '/', 
    component: HomeView 
  },
  { 
    path: '/testReadFile', 
    component: testReadFile 
  },
  { 
    path: '/myG2plot', 
    component: myG2plot
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router