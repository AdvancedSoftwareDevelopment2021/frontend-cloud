<template>
  <div>
    <Form ref="formItem" :model="formItem" :label-width="80">
      <FormItem>
        <Row :gutter="10">
          <Col span="6">
            <Select v-model="edgeInfo">
              <Option
                v-for="edgeItem in edgeList"
                :value="edgeItem"
                :key="edgeItem"
              >
                {{ edgeItem.name}}
              </Option>
            </Select>
          </Col>
        </Row>
      </FormItem>
      <FormItem class="footer">
        <Row :gutter="8" type="flex" justify="end">
          <Col>
            <Button @click="cancelBtnClick">取消</Button>
          </Col>
          <Col>
            <Button type="primary" :loading="loading" @click="confirmBtnClick">
              确认
            </Button>
          </Col>
        </Row>
      </FormItem>
    </Form>
  </div>
</template>

<script>
// TODO: remove property valueIndex
import { mapState, mapActions } from 'vuex'
export default {
  name: 'issueForm',
  components: {
  },
  props: {
    issueProcess: {
      type: Object
    },
    parentCancelBtnClick: {
      type: Function
    },
    parentConfirmBtnClick: {
      type: Function
    }
  },
  data () {
    let valueIndex = 1
    let formItem = JSON.parse(JSON.stringify(this.deviceInfo))
    // formItem.values[0] = {...formItem.values[0], valueIndex}
    return {
      edgeInfo,
      valueIndex,
      formItem,
      loading: false,
      bindingModalControl: false,
      activeDataSource: {},
      bindingList: []
    }
  },
  computed: {
    ...mapState({
      edgeList: (state) => state.edgeManagement.edgeList,
    }),
  },
  methods: {
    ...mapActions(['issueProcessAction']),
    // 因为当parentConfirmBtnClick为Component addDevice所传的方法时，是异步方法，所以要在这加async用来等待异步完成
    async confirmBtnClick () {
      this.loading = true
      var requestData = {
        'processDto': this.issueProcess,
        'ip': this.edgeInfo.ip,
        'port': this.edgeInfo.port
      }
      console.log(requestData)
      await this.issueProcessAction(requestData).then(() => {
        this.$Message.success('流程下发成功')
        }).catch(err => this.$Message.error(err.message))
          .finally(() => this.$Spin.hide())
      await this.parentConfirmBtnClick()
      this.loading = false
    },
    cancelBtnClick () {
      this.parentCancelBtnClick()
    },
  },
  watch: {
    issueProcess(newVal, oldVal) {
      console.log(`${newVal}, ${oldVal}`)
    }
  },
  mounted () {
    this.$nextTick(() => {
    })
  }
}
</script>

<style scoped>

</style>