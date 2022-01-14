import {
  getEdgeList,
  removeEdge,
  addEdge,
  modifyEdge,
  connectEdge,
  connectStopEdge,
} from "@/api/edge-management";
import { OFFLINE, ONLINE } from "../../constants/edgeStatus";

/**
 * 边缘端相关状态
 */
export default {
  state: {
    edgeList: [],
    edgeData: {},
  },
  mutations: {
    /**
     * 设置边缘端列表
     */
    setEdgeList(state, edgeList) {
      state.edgeList = edgeList;
    },
    /**
     * 添加边缘端
     */
    addEdge(state, edge) {
      state.edgeList = state.edgeList.concat(edge);
    },
    /**
     * 删除边缘端
     */
    deleteEdge(state, id) {
      state.edgeList = state.edgeList.filter((c) => c.id !== id);
    },
    /**
     * 修改边缘端
     */
    modifyEdge(state, edge) {
      state.edgeList.forEach((c) => {
        if (c.id === edge.id) {
          return edge;
        }
      });
    },
    /**
     * 设置当前的边缘端
     */
    setEdge(state, edge) {
      state.edgeData = edge;
    },
    /**
     * 连接边缘端
     */
    connectEdge(state, { id, flag }) {
      if (!flag) return;
      state.edgeList.forEach((c) => {
        if (c.id === id) {
          c.status = ONLINE;
        }
        return c;
      });
    },
    /**
     * 断开连接边缘端
     */
    connectStopEdge(state, { id, flag }) {
      if (!flag) return;
      state.edgeList.forEach((c) => {
        if (c.id === id) {
          c.status = OFFLINE;
        }
        return c;
      });
    },
  },
  actions: {
    /**
     * 从后端拉取边缘端列表
     */
    getEdgeListAction({ commit }) {
      return new Promise((resolve, reject) => {
        getEdgeList()
          .then((res) => {
            console.log(`EdgeList: ${res}`)
            commit("setEdgeList", res);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    /**
     * 添加边缘端
     */
    addEdgeAction({ commit }, data) {
      return new Promise((resolve, reject) => {
        addEdge(data)
          .then((res) => {
            commit("addEdge", res);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    /**
     * 删除边缘端
     */
    removeEdgeAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        removeEdge(id)
          .then(() => {
            commit("deleteEdge", id);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    /**
     * 修改边缘端
     */
    modifyEdgeAction({ commit }, data) {
      return new Promise((resolve, reject) => {
        modifyEdge(data.id, data)
          .then(() => {
            commit("modifyEdge", data);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    /**
     * 连接边缘端
     */
    connectEdgeAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        connectEdge(id)
          .then((res) => {
            commit("connectEdge", { id, flag: res });
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    /**
     * 断开连接边缘端
     */
    connectStopEdgeAction({ commit }, id) {
      return new Promise((resolve, reject) => {
        connectStopEdge(id)
          .then((res) => {
            commit("connectStopEdge", { id, flag: res });
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
