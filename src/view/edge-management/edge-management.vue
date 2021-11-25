<template>
  <Card>
    <Row type="flex" justify="end">
      <Button
        class="add-edge"
        type="primary"
        icon="md-add"
        ghost
        to="/edge_management/edge"
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
import PopConfirmButton from '_c/pop-confirm-button'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'edge-management',
  components: {
    PagedTable
  },
  data: function () {
    return {
      loading: true,
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
                    this.handleEdit(row)
                  }
                }
              },
              '编辑'
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
      this.removeEdge(id).then(
        () => this.$Message.success('删除成功')
      ).catch(
        (err) => this.$Message.error(err.message)
      )
    },
    handleEdit (data) {
      this.setEdge(data)
      this.router.push({ path: '/edge_management/edge' })
    },
    ...mapActions([
      'getEdgeList',
      'removeEdge'
    ]),
    ...mapMutations['setEdge']
  },
  mounted () {
    this.loading = true
    this.getEdgeList().then(() => {
      this.loading = false
    }).catch((err) => this.$Message.error(err.message))
  },
  computed: {
    ...mapState({
      edgeList: (state) => state.edgeManagement.edgeList
    })
  }
}
</script>

<style scoped>

</style>
