import Mock from 'mockjs'
// import { getUserInfo, login, logout } from './login'
import { getDragList, getOrgData, getTableData, getTreeSelectData, uploadImage } from './data'
import { getContentByMsgId, getMessageInit, hasRead, messageCount, removeReaded, restoreTrash } from './user'
// import { deleteEdge, getEdgeList, modifyEdge, addEdge } from './edge-management'
// import { deleteData, getDataList } from './data-management'

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 1000
})

// 登录相关和获取用户信息
// Mock.mock(/\/login/, login)
// Mock.mock(/\/get_info/, getUserInfo)
// Mock.mock(/\/logout/, logout)
Mock.mock(/\/get_table_data/, getTableData)
Mock.mock(/\/get_drag_list/, getDragList)
Mock.mock(/\/save_error_logger/, 'success')
Mock.mock(/\/image\/upload/, uploadImage)
Mock.mock(/\/message\/init/, getMessageInit)
Mock.mock(/\/message\/content/, getContentByMsgId)
Mock.mock(/\/message\/has_read/, hasRead)
Mock.mock(/\/message\/remove_readed/, removeReaded)
Mock.mock(/\/message\/restore/, restoreTrash)
Mock.mock(/\/message\/count/, messageCount)
Mock.mock(/\/get_org_data/, getOrgData)
Mock.mock(/\/get_tree_select_data/, getTreeSelectData)

// Mock.mock(/\/edge/, 'get', getEdgeList)
// Mock.mock(/\/edge\/[A-Za-z0-9-]*/, deleteEdge)
// Mock.mock(/\/edge/, 'put', modifyEdge)
// Mock.mock(/\/edge/, 'post', addEdge)
//
// Mock.mock(/\/data/, getDataList)
// Mock.mock(/\/data\/[A-Za-z0-9-]*/, deleteData)

export default Mock
