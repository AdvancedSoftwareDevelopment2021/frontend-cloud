<template>
  <Card>
    <Row type="flex" justify="center">
      <Col span="8">
        <edge-form ref="formRef" :submit="handleSubmit"/>
      </Col>
    </Row>
  </Card>
</template>

<script>
import EdgeForm from '_c/edge/form'
import { addEdge } from '@/api/edge-management'

export default {
  name: 'add-edge',
  components: {
    EdgeForm
  },
  data () {
    return {}
  },
  methods: {
    handleSubmit (data) {
      this.$Spin.show()
      addEdge(data).then(() => {
        this.$Message.success('边缘端添加成功')
        this.$refs.formRef.handleReset()
      }).catch(err => this.$Message.error(err.message))
        .finally(() => this.$Spin.hide())
    }
  }
}
</script>

<style scoped>

</style>
