import axios from "@/libs/api.request";
// import store from "@/store";

const url = "/model";

export const getAllModelListApi = () => {
  return axios.request({
    url: `${url}/list`,
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
    method: "post",
    data: modelInfo,
  });
};
