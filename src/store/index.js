import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '../utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储当前登录用户信息包含token的数据
    user: getItem('TOUTIAO_USER') || []
  },
  mutations: {
    setUser(state, data) {
      state.user = data

      // 将数据 备份到 本地存储
      setItem('TOUTIAO_USER', state.user)
    }

  },
  actions: {
  },
  modules: {
  }
})
