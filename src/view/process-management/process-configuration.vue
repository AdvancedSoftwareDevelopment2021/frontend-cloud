<template>
  <Card>
    <Row>
      <paged-table
      />
    </Row>
  </Card>
</template>

<script>
import PagedTable from '_c/paged-table/paged-table.vue'
import PagedTable from '../../components/paged-table/paged-table.vue'

export default {
  name: 'process-configuration',
  components: {
    PagedTable
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

<style scoped>

</style>
