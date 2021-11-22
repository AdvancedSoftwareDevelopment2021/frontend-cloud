import Mock from 'mockjs'
import { range } from 'lodash'

const { Random } = Mock

Random.extend({
  dataList: () => ({
    id: Random.guid(),
    name: Random.word(),
    edgeName: Random.word(),
    timestamp: Random.time()
  })
})

export const getDataList = () => range(25).map(Random.dataList)

export const deleteData = (id) => null
