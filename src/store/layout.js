import { defineStore } from 'pinia'

export const layoutStore = defineStore('layout', {
  // 开启数据持久化
  persist: {
    storage: localStorage,
  },
  // 推荐使用 完整类型推断的箭头函数
  state: () => {
    return {
      isCollapse: false,
    }
  },
  getters: {
    getIsCollapse: (state) => state.isCollapse,
  },
  actions: {
    changeisCollapse(val) {
      this.isCollapse = val
    }
  },
})