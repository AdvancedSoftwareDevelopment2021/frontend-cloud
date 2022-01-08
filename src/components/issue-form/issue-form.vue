<template>
  <div>
    <Form ref="formItem" :model="formItem" :label-width="80">
      
      <Row :gutter="10">
        <Col span="6">
          <Select v-model="edgeInfo">
            <Option
              v-for="edgeItem in edgeList"
              :value="edgeItem.port"
              :key="edgeItem.ip"
            >
              {{ edgeItem.name}}
            </Option>
          </Select>
        </Col>
        <Col span="1">
          <Button
            @click="handleRemove(listIndex)"
            size="small"
            shape="circle"
          >
            <Icon type="md-close" />
          </Button>
        </Col>
      </Row>
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
    </Form>
  </div>
</template>
<script>
// TODO: remove property valueIndex
import { mapState } from 'vuex'
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
      edge,
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
    // 因为当parentConfirmBtnClick为Component addDevice所传的方法时，是异步方法，所以要在这加async用来等待异步完成
    async confirmBtnClick () {
      let newDevice = this.formItem
      this.loading = true
      await this.parentConfirmBtnClick(newDevice)
      this.loading = false
      this.resetFormItem()
    },
    cancelBtnClick () {
      this.parentCancelBtnClick()
      this.resetFormItem()
    },
    resetFormItem () {
      // this.valueIndex = 1
      this.formItem = JSON.parse(JSON.stringify(this.deviceInfo))
      // console.log(`reset: ${JSON.stringify(this.deviceInfo)}`)
    },
    handleAdd () {
      // this.valueIndex++
      this.formItem.values.push({
        // valueIndex: this.valueIndex,
        name: '',
        type: '',
        protocol: ''
      })
    },
    handleRemove (listIndex) {
      // console.log("Delete listItem: " + listIndex);
      this.formItem.values.splice(listIndex, 1)
    }
  },
  mounted () {
    this.$nextTick(() => {
      // console.log(this._uid)
    })
  }
}
</script>
