import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import edgeManagement from './module/edge-management'
import processManagement from './module/process-management'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    edgeManagement,
    processManagement
  }
})
