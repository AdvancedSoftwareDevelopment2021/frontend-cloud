<template>
  <Card>
    <Row type="flex" justify="end">
      <Button
        class="add-edge"
        type="primary"
        icon="md-add"
        ghost
        to="/edge_management/create-edge"
      >
      </Button>
    </Row>
    <Row>
      <paged-table
        :loading="loading"
        :columns="columns"
        :data-source="edgeList"
        :total="edgeList.length"
        style="margin-bottom: 50px"
      />
    </Row>
  </Card>
</template>

<script>
import PagedTable from '_c/paged-table/paged-table.vue'
import PopConfirmButton from '_c/pop-confirm-button'
import { mapState, mapActions, mapMutations } from 'vuex'
import { timeUnitNames } from '@/constants/timeUnits'
import { edgeStatusNames } from '@/constants/edgeStatus'

export default {
  name: 'process-configuration',
  components: {
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
