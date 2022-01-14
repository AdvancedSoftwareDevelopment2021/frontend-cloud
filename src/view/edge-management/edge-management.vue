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
        新增边缘端
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
import PagedTable from "_c/paged-table/paged-table.vue";
import PopConfirmButton from "_c/pop-confirm-button";
import { mapState, mapActions, mapMutations } from "vuex";
import { timeUnitNames } from "@/constants/timeUnits";
import { edgeStatusNames } from "@/constants/edgeStatus";

export default {
  name: "edge-management",
  components: {
    PagedTable,
  },
  data: function () {
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
          width: "150px"
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
          width: "200px",
        },
        {
          title: "状态",
          key: "status",
          render: (h, { row }) => h("span", edgeStatusNames[row.status]),
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
                popTipTitle: "确定要删除这个边缘端？",
                ok: () => this.handleDelete(row.id),
              },
            });
            const editButton = h(
              "Button",
              {
                props: {
                  size: "small",
                  type: "primary",
                },
                style: {
                  marginRight: "1%",
                },
                on: {
                  click: () => {
                    this.handleEdit(row);
                  },
                },
              },
              "编辑"
            );
            const connectButton = h(
              "Button",
              {
                props: {
                  size: "small",
                  type: "primary",
                },
                style: {
                  marginRight: "1%",
                },
                on: {
                  click: () => {
                    this.handleConnect(row.id);
                  },
                },
              },
              "连接"
            );
            const disconnectButton = h(
              "Button",
              {
                props: {
                  size: "small",
                  type: "primary",
                },
                style: {
                  marginRight: "1%",
                },
                on: {
                  click: () => {
                    this.handleDisconnect(row.id);
                  },
                },
              },
              "断连"
            );
            const buttons = [
              connectButton,
              disconnectButton,
              editButton,
              deleteButton,
            ];
            return h("div", buttons);
          },
        },
      ],
    };
  },
  methods: {
    ...mapActions([
      "getEdgeListAction",
      "removeEdgeAction",
      "connectEdgeAction",
      "connectStopEdgeAction",
    ]),
    ...mapMutations(["setEdge"]),
    handleDelete(id) {
      this.removeEdgeAction(id)
        .then(() => this.$Message.success("删除成功"))
        .catch((err) => this.$Message.error(err.message));
    },
    handleEdit(data) {
      this.setEdge(data);
      this.$router.push({ path: "modify-edge" });
    },
    handleConnect(id) {
      this.loading = true;
      this.connectEdgeAction(id)
        .then(() => {})
        .catch((err) => this.$Message.error(err.message))
        .finally(() => {
          this.loading = false;
        });
    },
    handleDisconnect(id) {
      this.loading = true;
      this.connectStopEdgeAction(id)
        .then(() => {})
        .catch((err) => this.$Message.error(err.message))
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.loading = true;
    this.getEdgeListAction()
      .then(() => {
        this.loading = false;
      })
      .catch((err) => this.$Message.error(err.message));
  },
  computed: {
    ...mapState({
      edgeList: (state) => state.edgeManagement.edgeList,
    }),
  },
};
</script>

<style scoped>
</style>
