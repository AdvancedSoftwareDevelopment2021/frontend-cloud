<template>
  <div>
    <Row type="flex" justify="center">
      <Col span="8">
        <edge-form ref="formRef" :submit="handleSubmit" :edgeData="this.edgeData"/>
      </Col>
    </Row>
  </div>
</template>

<script>
import EdgeForm from '_c/edge/form'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'modify-edge',
  components: {
    EdgeForm
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      edgeData: (state) => { return state.edgeManagement.edgeData }
    })
  },
  methods: {
    ...mapActions(['modifyEdgeAction']),
    handleSubmit (data) {
      this.$Spin.show()
      data = { ...data, id: this.edgeData.id }
      this.modifyEdgeAction(data).then(() => {
        this.$Message.success('边缘端修改成功')
      }).catch(err => this.$Message.error(err.message))
        .finally(() => this.$Spin.hide())
    }
  }
}
</script>

<style scoped>

</style>
