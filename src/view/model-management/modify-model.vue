<template>
  <div>
    <Row type="flex" justify="center">
      <Col span="8">
        <model-form ref="formRef" :submit="handleSubmit" :modelData="this.modelData" mode="EDIT"/>
      </Col>
    </Row>
  </div>
</template>

<script>
import ModelForm from '_c/model/form'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'modify-edge',
  components: {
    ModelForm
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      modelData: (state) => { return state.modelManagement.modelData }
    })
  },
  methods: {
    ...mapActions(['modifyEdgeAction']),
    handleSubmit (data) {
      this.$Spin.show()
      data = { ...data, id: this.modelData.id }
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
