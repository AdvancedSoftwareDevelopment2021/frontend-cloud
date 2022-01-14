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
          title: "名称",
          key: "name",
        },
        {
          title: "描述",
          key: "description",
        },
        {
          title: "主机名或ip地址",
          key: "ip",
        },
        {
          title: "端口号",
          key: "port",
        },
        {
          title: "连接路径",
          key: "api",
        },
        {
          title: "时间间隔",
          key: "time",
          render: (h, { row }) =>
            h("span", row.interval + timeUnitNames[row.timeUnit]),
        },
        {
          title: "注册时间",
          key: "registerTimestamp",
        },
        // {
        //   title: "状态",
        //   key: "status",
        //   render: (h, { row }) => h("span", edgeStatusNames[row.status]),
        // },
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
                ok: () => this.handleDelete(row.id),
              },
            });
            const buttons = [
              deleteButton,
            ];
            return h("div", buttons);
          },
        },
      ],
      modelBindingList: []
    };
  },
  computed: {
    ...mapState({
      edgeList: (state) => state.edgeManagement.edgeList,
    }),
  },
  methods: {
    ...mapMutations(["setModel"]),
    ...mapActions(["connectEdgeAction"]),
    ...mapActions(["deleteModelAction"]),
    handleDelete(id) {
      this.deleteModelAction(id)
        .then(() => this.$Message.success("删除成功"))
        .catch((err) => this.$Message.error(err.message));
    },
    handleSend(data) {
      this.setModel(data);
    //   this.$router.push({ path: "send_management" });
    },
    handleDelete(id) {
      //   this.removeEdgeAction(id)
      //     .then(() => this.$Message.success("删除成功"))
      //     .catch((err) => this.$Message.error(err.message));
    },
    handleConnect(id) {
      //   this.loading = true;
      //   this.connectEdgeAction(id)
      //     .then(() => {})
      //     .catch((err) => this.$Message.error(err.message))
      //     .finally(() => {
      //       this.loading = false;
      //     });
    },
  },
  async mounted() {
    this.loading = true;
    this.$nextTick(() => {
      console.log(this.edgeList);
    });
    this.modelBindingList = this.edgeList
    this.loading = false;
  },
};
</script>
