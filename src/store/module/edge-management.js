import { getEdgeList, removeEdge, addEdge, modifyEdge } from '@/api/edge-management'

/**
 * 边缘端相关状态
 */
export default {
  state: {
    edgeList: [],
    edgeData: {}
  },
  mutations: {
    /**
     * 设置边缘端列表
     */
    setEdgeList (state, edgeList) { state.edgeList = edgeList },
    /**
     * 添加边缘端
     */
    addEdge (state, edge) { state.edgeList = state.edgeList.concat(edge) },
    /**
     * 删除边缘端
     */
    deleteEdge (state, id) { state.edgeList = state.edgeList.filter(c => c.id !== id) },
    /**
     * 修改边缘端
     */
    modifyEdge (state, edge) {
      console.log(edge)
      state.edgeList.forEach(c => {
        if (c.id === edge.id) {
          return edge
        }
      })
    },
    /**
     * 设置当前的边缘端
     */
    setEdge (state, edge) {
      state.edgeData = edge
    }
  },
  actions: {
    /**
     * 从后端拉取边缘端列表
     */
    getEdgeListAction ({ commit }) {
      return new Promise((resolve, reject) => {
        getEdgeList().then(res => {
          commit('setEdgeList', res.data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 添加边缘端
     */
    addEdgeAction ({ commit }, data) {
      return new Promise((resolve, reject) => {
        addEdge(data).then(res => {
          commit('addEdge', res.data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 删除边缘端
     */
    removeEdgeAction ({ commit }, id) {
      return new Promise((resolve, reject) => {
        removeEdge(id).then(() => {
          commit('deleteEdge', id)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     * 修改边缘端
     */
    modifyEdgeAction ({ commit }, data) {
      console.log('action', data)
      return new Promise((resolve, reject) => {
        modifyEdge(data).then(() => {
          commit('modifyEdge', data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
