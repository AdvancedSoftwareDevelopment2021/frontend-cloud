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
}
</script>

<style lang=scss scoped>

</style>
