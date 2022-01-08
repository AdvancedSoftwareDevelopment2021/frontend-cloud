<template>
  <Card>
    <Row type="flex" justify="end">
      <Button
        class="add-edge"
        type="primary"
        icon="md-add"
        ghost
        to="/process_management/process-configuration"
      >
        新建流程
      </Button>
    </Row>
    <Row>
      <paged-table
        :loading="loading"
        :columns="columns"
        :data-source=" processList"
        :total=" processList.length"
        style="margin-bottom: 50px"
      />
    </Row>
    <Modal
        v-model="modalControl"
        title="下发流程"
        footer-hide
        :closable="false"
      >
        <issue-form
          :issueProcess="issueProcess"
          :parentCancelBtnClick="modalCancelBtnClick"
          :parentConfirmBtnClick="modalConfirmBtnClick"
        >
        </issue-form>
      </Modal>
  </Card>
</template>

<script>
import PagedTable from '_c/paged-table/paged-table.vue'
import PopConfirmButton from '_c/pop-confirm-button'
import issueForm from '_c/issue-form/issue-form'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'ProcessManagement',
  components: {
    PagedTable,
    issueForm
  },
  data: function () {
    return {
      loading: true,
      modalControl: false,
      issueProcess: null,
      columns: [
        {
          title: 'id',
          key: 'id'
        },
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '创建时间',
          key: 'createdTime'
        },
        {
          title: '流程状态',
          key: 'status'
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
                popTipTitle: '确定要删除这个流程？',
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
            const issueButton = h('Button',
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
                    this.modalControl = true
                    this.issueProcess = row
                  }
                }
              },
              '下发'
            )
            const buttons = [issueButton, editButton, deleteButton]
            return h('div', buttons)
          }
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'getProcessListAction',
      'removeProcessAction',
      'connectProcessAction',
      'connectStopProcessAction'
    ]),
    ...mapMutations(['setProcess']),
    handleDelete (id) {
      this.removeProcessAction(id).then(
        () => this.$Message.success('删除成功')
      ).catch(
        (err) => this.$Message.error(err.message)
      )
    },
    handleEdit (data) {
      this.setProcess(data)
      this.$router.push({ path: 'process-modification' })
    },
    modalCancelBtnClick() {
      this.modalControl = false
    },
    modalConfirmBtnClick() {
      this.modalControl = false
    }
  },
  mounted () {
    this.loading = true
    this.getProcessListAction().then(() => {
      this.loading = false
    }).catch((err) => this.$Message.error(err.message))
  },
  computed: {
    ...mapState({
       processList: (state) => state.processManagement.processList
    })
  }
}
</script>

<style scoped>

</style>
