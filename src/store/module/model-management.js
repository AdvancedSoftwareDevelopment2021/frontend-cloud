import {
  getAllModelListApi,
  insertModelApi,
  deleteModelApi,
} from "@/api/model-management";

export default {
  state: {
    modelList: [],
    modelData: {},
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
    //   let model = state.modelList.find(
    //     (modelInfo) => modelInfo.id === modelInfo.id
    //   );
    //   model = modelInfo;
    },
    setModel(state, data) {
      state.modelData = data;
    },
  },
  actions: {
    async getAllModelListAction({ state, commit }) {
      let res = await getAllModelListApi();
      commit("setModelList", res);
      console.log(res)
    },
    async insertModelAction({ state, commit }, data) {
        console.log(data)
      let ret = null;
      try {
        let res = insertModelApi(data);
        commit("addModel", res);
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
      return deleteModelApi(id).then(() => {
        commit("updateModel", { id, modelInfo });
      });
    },
  },
};
