import axios from '@/libs/api.request'

const url = '/edge'

export const getEdgeList = () => axios.request({
  url: `${url}`,
  method: 'get'
})

export const removeEdge = (id) => axios.request({
  url: `${url}/${id}`,
  method: 'delete'
})

export const addEdge = (data) => axios.request({
  url: `${url}`,
  data: data,
  method: 'post'
})

export const modifyEdge = (data) => axios.request({
  url: `${url}`,
  data: data,
  method: 'put'
})
