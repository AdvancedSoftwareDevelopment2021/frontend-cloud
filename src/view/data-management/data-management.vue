<template>
  <Card>
    <Row>
      <paged-table
        :loading="loading"
        :columns="columns"
        :data-source="dataList"
        :total="dataList.length"
        style="margin-bottom: 50px"
      />
    </Row>
  </Card>
</template>

<script>
import PagedTable from '_c/paged-table/paged-table.vue'
import { getDataList, removeData, downloadData } from '@/api/data-management'
import PopConfirmButton from '_c/pop-confirm-button'

export default {
  name: 'data-management',
  components: {
    PagedTable
  },
  data: function () {
    return {
      loading: true,
      dataList: [],
      columns: [
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '边缘端名称',
          key: 'edgeName'
        },
        {
          title: '接收时间',
          key: 'timestamp'
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
                popTipTitle: '确定要删除这个数据？',
                ok: () => this.handleDelete(row.id)
              }
            })
            const downloadButton = h('Button',
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
                    this.handleDownload(row.id)
                  }
                }
              },
              '下载文件'
            )
            const buttons = [downloadButton, deleteButton]
            return h('div', buttons)
          }
        }
      ]
    }
  },
  methods: {
    handleDelete (id) {
      this.loading = true
      removeData(id).then(
        () => {
          this.refresh()
          this.$Message.success('删除成功')
        }
      ).catch(
        (err) => this.$Message.error(err.message)
      ).finally(() => {
        this.loading = false
      })
    },
    handleDownload (id) {
      downloadData(id)
    },
    refresh () {
      this.loading = true
      getDataList().then((res) => {
        this.dataList = res
        this.loading = false
      }).catch((err) => this.$Message.error(err.message))
    }
  },
  mounted () {
    this.refresh()
  }
}
</script>

<style scoped>

</style>
