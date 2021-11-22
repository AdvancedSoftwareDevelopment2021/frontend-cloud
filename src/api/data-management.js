import axios from '@/libs/api.request'

const url = '/data'

export const getDataList = () => axios.request({
  url: `${url}`,
  method: 'get'
})

export const removeData = (id) => axios.request({
  url: `${url}/${id}`,
  method: 'delete'
})
