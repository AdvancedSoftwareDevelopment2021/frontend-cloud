import { getEdgeList, removeEdge, addEdge, modifyEdge } from '@/api/edge-management'

/**
 * 边缘端相关状态
 */
export default {
  state: {
    edgeList: [],
    edgeData: []
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
    getEdgeList ({ commit }) {
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
    async addEdge ({ commit }, data) {
      commit('addEdge', await addEdge(data))
    },
    /**
     * 删除边缘端
     */
    async removeEdge ({ commit }, id) {
      await removeEdge(id)
      commit('deleteEdge', id)
    },
    /**
     * 修改边缘端
     */
    async modifyEdge ({ commit }, data) {
      await modifyEdge(data)
      commit('modifyEdge', data)
    }
  }
}
