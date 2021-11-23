<template>
  <Card>
    <Row type="flex" justify="end">
      <Button
        class="add-edge"
        type="primary"
        icon="md-add"
        ghost
        to="/edge_management/add_edge"
      >
        新增边缘端
      </Button>
    </Row>
    <Row>
      <paged-table
        :loading="loading"
        :columns="columns"
        :data-source="edgeList"
        :total="edgeList.length"
        style="margin-bottom: 50px"
      />
    </Row>
  </Card>
</template>

<script>
import PagedTable from '_c/paged-table/paged-table.vue'
import { getEdgeList, removeEdge } from '@/api/edge-management'
import PopConfirmButton from '_c/pop-confirm-button'

export default {
  name: 'edge-management',
  components: {
    PagedTable
  },
  data: function () {
    return {
      loading: true,
      edgeList: [],
      columns: [
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '创建人',
          key: 'ownerName'
        },
        {
          title: '描述',
          key: 'description'
        },
        {
          title: 'ip',
          key: 'ip'
        },
        {
          title: 'port',
          key: 'port'
        },
        {
          title: '操作',
          key: 'operation',
          render: (h, { row }) => {
            const deleteButton = h(PopConfirmButton, {
              props: {
                buttonProps: {
                  size: 'small', type: 'error'
                },
                buttonText: '删除',
                popTipTitle: '确定要删除这个边缘端？',
                ok: () => this.handleDelete(row.id)
              }
            })
            const editButton = h('Button',
              {
                props: {
                  size: 'small',
                  type: 'primary'
                },
                style: {
                  marginRight: '1%'
                },
                on: {
                  click: () => {

                  }
                }
              },
              '编辑边缘端'
            )
            const buttons = [editButton, deleteButton]
            return h('div', buttons)
          }
        }
      ]
    }
  },
  methods: {
    handleDelete (id) {
      removeEdge(id).then(
        () => this.$Message.success('删除成功')
      ).catch(
        (err) => this.$Message.error(err.message)
      )
    }
  },
  mounted () {
    getEdgeList().then((res) => {
      this.edgeList = res.data
      this.loading = false
    }).catch((err) => this.$Message.error(err.message))
  }
}
</script>

<style scoped>

</style>
