<template>
  <div>
    <paged-table />
    <vue-bpmn />
  </div>
</template>

<script>
import VueBpmn from '_c/VueBpmn'

export default {
  name: 'process-configuration',
  components: {
    PagedTable,
    VueBpmn
  },
  data: function () {
    return {
    }
  },
  methods: {

  },
  mounted () {

  },
  computed: {

  }
}
</script>

<style lang=scss scoped>

</style>
