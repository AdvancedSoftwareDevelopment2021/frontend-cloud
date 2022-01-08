import { getProcessList, getProcess, removeProcess, addProcess, modifyProcess } from '@/api/process-management'

/**
 * 边缘端相关状态
 */
export default {
  state: {
    processList: [],
    processData: {}
  },
  mutations: {
    /**
     * 设置边缘端列表
     */
    getProcessList (state, processList) { state.processList = processList },
    /**
     * 添加边缘端
     */
    addProcess (state, process) { state.processList = state.processList.concat(process) },
    /**
     * 删除边缘端
     */
    deleteProcess (state, id) { state.processList = state.processList.filter(c => c.id !== id) },
    /**
     * 查询边缘端
     */
    getProcess (state, id) { state.processList = state.processList.filter(c => c.id !== id) },
    /**
     * 修改边缘端
     */
    modifyProcess (state, process) {
      state.processList.forEach(c => {
        if (c.id === process.id) {
          return process
        }
      })
    },
    /**
     * 设置当前的边缘端
     */
    setProcess (state, process) {
      state.processData = process
    },
  },
  actions: {
    /**
     * 从后端拉取边缘端列表
     */
    getProcessListAction ({ commit }) {
      return new Promise((resolve, reject) => {
        getProcessList().then(res => {
          commit('getProcessList', res)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 添加边缘端
     */
    addProcessAction ({ commit }, data) {
      return new Promise((resolve, reject) => {
        addProcess(data).then(res => {
          commit('addProcess', res)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 查询边缘端
     */
     getProcessAction ({ commit }, id) {
      return new Promise((resolve, reject) => {
        getProcess(id).then(() => {
          commit('getProcess', id)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 删除边缘端
     */
    removeProcessAction ({ commit }, id) {
      return new Promise((resolve, reject) => {
        removeProcess(id).then(() => {
          commit('deleteProcess', id)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 修改边缘端
     */
    modifyProcessAction ({ commit }, data) {
      return new Promise((resolve, reject) => {
        modifyProcess(data.id, data).then(() => {
          commit('modifyProcess', data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 流程下发
     */
    issueProcessAction ({ commit }, data) {
      return new Promise((resolve, reject) => {
        issueProcess(data).then(res => {
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
