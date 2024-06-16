import { defineStore } from 'pinia'
 
// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useStore = defineStore('main', {
  // 开启数据持久化
  persist: {
    storage: localStorage,
  },
  // 推荐使用 完整类型推断的箭头函数
  state: () => {
    return {
      excelDatas: [],
      current: '', // 当前选中的月份
      monthlist: [] // 月份列表
    }
  },
  getters: {
    getExcels: (state) => state.excelDatas,
    getCurrent: (state) => state.current,
    getMonthlist: (state) => state.monthlist
  },
  actions: {
    setExcels(val) {
      this.excelDatas = val
    },
    setCurrent(val) {
      this.current = val
    },
    setMonthlist(val) {
      this.monthlist = val
    }
  },
})