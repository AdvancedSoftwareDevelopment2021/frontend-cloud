import axios from "@/libs/api.request";
import store from "@/store";

const url = "/edge";

export const getEdgeList = () => {
  axios.request({
    url: `${url}/list/user/${store.state.user.userId}`,
    method: "get",
  });
};

export const removeEdge = (id) =>
  axios.request({
    url: `${url}/${id}`,
    method: "delete",
  });

export const addEdge = (data) =>
  axios.request({
    url: `${url}/`,
    data: data,
    method: "post",
  });

export const modifyEdge = (id, data) =>
  axios.request({
    url: `${url}/${id}`,
    data: data,
    method: "put",
  });

export const connectEdge = (id) =>
  axios.request({
    url: `${url}/ping/${id}`,
    method: "get",
  });

export const connectStopEdge = (id) =>
  axios.request({
    url: `${url}/ping/stop/${id}`,
    method: "get",
  });
