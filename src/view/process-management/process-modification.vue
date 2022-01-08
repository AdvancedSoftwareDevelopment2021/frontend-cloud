<template>
  <div>
    <vue-bpmn :processData="this.processData" />
  </div>
</template>

<script>
import VueBpmn from '_c/vue-bpmn'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ProcessModification',
  components: {
    VueBpmn
  },
  data: function () {
    return {

    }
  },
  computed: {
    ...mapState({
      processData: (state) => { return state.processManagement.processData }
    })
  },
  methods: {
    // handleSubmit (data) {
    //   this.$Spin.show()
    //   data = { ...data, id: this.processData.id }
    //   this.modifyProcessAction(data).then(() => {
    //     this.$Message.success('流程修改成功')
    //   }).catch(err => this.$Message.error(err.message))
    //     .finally(() => this.$Spin.hide())
    // }
  }
}
</script>

<style lang=scss scoped>

</style>
