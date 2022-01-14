import {
  getAllModelListApi,
  insertModelApi,
  deleteModelApi,
  updateModelApi,
  getModelBindingEdgeListApi,
  BindingEdgeApi,
  deleteBindingEdgeApi,
} from "@/api/model-management";

export default {
  state: {
    modelList: [],
    modelData: {},
    modelBindingList: [],
  },
  mutations: {
    setModelList(state, res) {
      state.modelList = res;
    },
    deleteModel(state, id) {
      state.modelList = state.modelList.filter((model) => model.id !== id);
    },
    addModel(state, model) {
      state.modelList = state.modelList.concat(model);
    },
    updateModel(state, { id, modelInfo }) {
      // TODO: update
      let modelIndex = state.modelList.findIndex(
        (modelInfo) => modelInfo.id === id
      );
      state.modelList[modelIndex] = modelInfo;
    },
    setModel(state, data) {
      state.modelData = data;
    },
    setBindingEdgeList(state, data) {
      state.modelBindingList = data;
    },
  },
  actions: {
    async getAllModelListAction({ state, commit, rootState }) {
      let userId = rootState.user.userId
      let res = await getAllModelListApi(userId);
      commit("setModelList", res);
    },
    async insertModelAction({ state, commit }, data) {
      //   console.log(data);
      let ret = null;
      try {
        await insertModelApi(data);
        // commit("addModel", res);
        ret = Promise.resolve();
      } catch (e) {
        ret = Promise.reject(e);
      }
      return ret;
    },
    deleteModelAction({ state, commit }, id) {
      return deleteModelApi(id).then(() => {
        commit("deleteModel", id);
      });
    },
    updateModelAction({ state, commit }, { id, modelInfo }) {
      return updateModelApi({ modelId: id, modelInfo }).then(() => {
        commit("updateModel", { id, modelInfo });
      });
    },
    async getModelBindingEdgeList({ state, commit }, { id }) {
      let res = await getModelBindingEdgeListApi(id);
      console.log(res);
      commit("setBindingEdgeList", res);
    },
    async bindingEdgeAction({ state, commit, dispatch }, { id, edgeId }) {
      console.log(id, edgeId);
      await BindingEdgeApi({ modelId: id, edgeId });
      dispatch("getModelBindingEdgeList", { id });
    },
    async deleteBindingEdgeAction({ state, commit, dispatch }, { id, edgeId }) {
      await deleteBindingEdgeApi({ modelId: id, edgeId });
      dispatch("getModelBindingEdgeList", { id });
    },
  },
};
