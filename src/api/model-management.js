import axios from "@/libs/api.request";
// import store from "@/store";

const url = "/model";

export const getAllModelListApi = (userId) => {
  return axios.request({
    url: `${url}/list/user/${userId}`,
    method: "get",
  });
};

export const insertModelApi = (modelInfo) => {
  return axios.request({
    url: `${url}`,
    method: "post",
    data: modelInfo,
  });
};

export const deleteModelApi = (modelId) => {
  return axios.request({
    url: `${url}/${modelId}`,
    method: "delete",
  });
};

export const updateModelApi = ({ modelId, modelInfo }) => {
  return axios.request({
    url: `${url}/${modelId}`,
    method: "put",
    data: modelInfo,
  });
};

export const getModelBindingEdgeListApi = (modelId) => {
  return axios.request({
    url: `${url}/${modelId}/edge`,
    method: "get",
  });
};

export const BindingEdgeApi = ({ modelId, edgeId }) => {
  return axios.request({
    url: `${url}/bind/${modelId}/${edgeId}`,
    method: "post",
  });
};

export const deleteBindingEdgeApi = ({ modelId, edgeId }) => {
  console.log(`${url}/${modelId}/edge/${edgeId}`);
  return axios.request({
    url: `${url}/${modelId}/edge/${edgeId}`,
    method: "delete",
  });
};
