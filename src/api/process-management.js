import axios from '@/libs/api.request'

const url = '/process'

export const getProcessList = () => axios.request({
  url: `${url}`,
  method: 'get'
})

export const getProcess = (id) => axios.request({
  url: `${url}/${id}}`,
  method: 'get'
})

export const removeProcess = (id) => axios.request({
  url: `${url}/${id}`,
  method: 'delete'
})

export const addProcess = (data) => axios.request({
  url: `${url}`,
  data: data,
  method: 'post'
})

export const modifyProcess = (id, data) => axios.request({
  url: `${url}/${id}`,
  data: data,
  method: 'put'
})
