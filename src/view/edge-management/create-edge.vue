<template>
  <div>
    <Row type="flex" justify="center">
      <Col span="8">
        <edge-form ref="formRef" :submit="handleSubmit"/>
      </Col>
    </Row>
  </div>
</template>

<script>
import EdgeForm from '_c/edge/form'
import { mapActions } from 'vuex'

export default {
  name: 'create-edge',
  components: {
    EdgeForm
  },
  data () {
    return {

    }
  },
  methods: {
    handleSubmit (data) {
      this.$Spin.show()
      this.addEdgeAction(data).then(() => {
        this.$Message.success('边缘端添加成功')
        this.$refs.formRef.handleReset()
      }).catch(err => this.$Message.error(err.message))
        .finally(() => this.$Spin.hide())
    },
    ...mapActions(['addEdgeAction'])
  }
}
</script>

<style scoped>

</style>
