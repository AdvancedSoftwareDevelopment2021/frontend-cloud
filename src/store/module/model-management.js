import {
  getAllModelListApi,
  insertModelApi,
  deleteModelApi,
  updateModelApi,
  getModelBindingEdgeListApi,
  BindingEdgeApi,
  deleteBindingEdgeApi,
} from "@/api/model-management";
import { timeUnitNames } from "@/constants/timeUnits";

export default {
  state: {
    modelList: [],
    modelData: {},
    modelBindingList: [],
  },
  mutations: {
    setModelList(state, res) {
      console.log(res);
      let modelList = res.map((item) => {
        let ret = {
          ...item,
        };
        if (item.train === 'true') {
          ret.isTrain = "是";
          ret.time = item.interval + timeUnitNames[item.timeUnit];
        } else {
          ret.isTrain = "否";
          ret.time = "-";
        }
        return ret;
      });
      state.modelList = modelList;
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
    async getAllModelListAction({ state, commit }) {
      let res = await getAllModelListApi();
      commit("setModelList", res);
    },
    async insertModelAction({ state, commit }, data) {
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
    //   console.log(res);
      commit("setBindingEdgeList", res);
    },
    async bindingEdgeAction({ state, commit, dispatch }, { id, edgeId }) {
    //   console.log(id, edgeId);
      await BindingEdgeApi({ modelId: id, edgeId });
      dispatch("getModelBindingEdgeList", { id });
    },
    async deleteBindingEdgeAction({ state, commit, dispatch }, { id, edgeId }) {
      await deleteBindingEdgeApi({ modelId: id, edgeId });
      dispatch("getModelBindingEdgeList", { id });
    },
  },
};
