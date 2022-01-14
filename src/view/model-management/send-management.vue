<template>
  <Card>
    <Row type="flex" justify="end">
      <Button
        class="add-model"
        type="primary"
        icon="md-add"
        ghost
        @click="handleAdd"
      >
        新增下发边缘
      </Button>
      <Modal v-model="modal" title="绑定边缘端" footer-hide :closable="false">
        <Form ref="bindingForm" :model="bindingForm" :label-width="80">
          <FormItem label="设备名称">
            <Row>
              <Col span="20">
                <Select v-model="selectEdge">
                  <Option v-for="item in edgeList" :value="item" :key="item.id"
                    >{{ item.name }}
                  </Option>
                </Select>
              </Col>
            </Row>
          </FormItem>
          <Row :gutter="8" type="flex" justify="end">
            <Col>
              <Button @click="cancelBtnClick">取消</Button>
            </Col>
            <Col>
              <Button
                type="primary"
                :loading="loading"
                @click="confirmBtnClick"
              >
                确认
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Row>
    <Row>
      <paged-table
        :loading="loading"
        :columns="columns"
        :data-source="modelBindingList"
        :total="modelBindingList.length"
        style="margin-bottom: 50px"
      />
    </Row>
  </Card>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import PagedTable from "_c/paged-table/paged-table.vue";
import PopConfirmButton from "_c/pop-confirm-button";
import { timeUnitNames } from "@/constants/timeUnits";

export default {
  components: { PagedTable, PopConfirmButton },
  name: "send-management",
  data() {
    return {
      loading: true,
      columns: [
        {
          title: "id",
          key: "id",
        },
        {
          title: "名称",
          key: "name",
        },
        {
          title: "操作",
          key: "operation",
          render: (h, { row }) => {
            const deleteButton = h(PopConfirmButton, {
              props: {
                buttonProps: {
                  size: "small",
                  type: "error",
                },
                buttonText: "删除",
                popTipTitle: "确定要删除这个绑定？",
                ok: () => this.handleDeleteBinding(row.id),
              },
            });
            const buttons = [deleteButton];
            return h("div", buttons);
          },
        },
      ],
      modal: false,
      selectEdge: null,
    };
  },
  computed: {
    ...mapState({
      edgeList: (state) => state.edgeManagement.edgeList,
      modelData: (state) => state.modelManagement.modelData,
      modelBindingList: (state) => state.modelManagement.modelBindingList,
    }),
  },
  methods: {
    ...mapMutations(["setModel"]),
    ...mapActions([
      "connectEdgeAction",
      "getModelBindingEdgeList",
      "bindingEdgeAction",
    ]),
    ...mapActions(["deleteBindingEdgeAction"]),
    handleAdd() {
      this.modal = true;
    },
    handleDeleteBinding(id) {
      this.deleteBindingEdgeAction({
        id: this.modelData.id,
        edgeId: id,
      })
        .then(() => this.$Message.success("删除绑定成功"))
        .catch((err) => this.$Message.error(err.message));
    },
    handleSend(data) {
      this.setModel(data);
      //   this.$router.push({ path: "send_management" });
    },
    cancelBtnClick() {
      this.modal = false;
    },
    confirmBtnClick() {
      this.modal = false;
      //   console.log(this.selectEdge);
      //   console.log(this.modelData);
      this.bindingEdgeAction({
        id: this.modelData.id,
        edgeId: this.selectEdge.id,
      });
      //   console.log(this.bindingDevice);
    },
  },
  async mounted() {
    this.loading = true;
    this.$nextTick(() => {
      console.log(this.edgeList);
    });
    console.log(this.modelData);
    this.getModelBindingEdgeList({ id: this.modelData.id });
    this.loading = false;
  },
};
</script>
