import Mock from 'mockjs'
import { range } from 'lodash'

const { Random } = Mock

Random.extend({
  edgeList: () => ({
    id: Random.guid(),
    name: Random.word(),
    ownerName: Random.word(),
    ip: Random.guid(),
    port: Random.guid(),
    description: Random.csentence(20)
  })
})

export const getEdgeList = () => {
  return range(25).map(Random.edgeList)
}

export const deleteEdge = (id) => null

export const addEdge = (data) => null

export const modifyEdge = (data) => null
