import { createWebHashHistory, createRouter } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import demo from '@/views/demo.vue'
import myG2plot from '@/views/MyG2plot.vue'
import myG2plot2 from '@/views/MyG2plot2.vue'
import myEcharts from '@/views/MyEcharts.vue'
import myG2plot3 from '@/views/MyG2plot3.vue'

const routes = [
  { 
    path: '/', 
    component: HomeView 
  },
  { 
    path: '/myG2plot', 
    component: myG2plot 
  },
  { 
    path: '/myG2plot2', 
    component: myG2plot2 
  },
  { 
    path: '/myEcharts', 
    component: myEcharts 
  },
  { 
    path: '/demo', 
    component: demo 
  },
  { 
    path: '/myG2plot3', 
    component: myG2plot3 
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router