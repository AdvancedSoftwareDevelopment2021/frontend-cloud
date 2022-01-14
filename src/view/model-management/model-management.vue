<template>
  <Card>
    <Row type="flex" justify="end">
      <Button
        class="add-model"
        type="primary"
        icon="md-add"
        ghost
        to="/model_management/create_model"
      >
        新增模型
      </Button>
    </Row>
    <Row>
      <paged-table
        :loading="loading"
        :columns="columns"
        :data-source="modelList"
        :total="modelList.length"
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
  name: "model-management",
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
          // TODO: 如何形容owner
          title: "创建角色",
          key: "owner",
        },
        {
          title: "时间间隔",
          key: "time",
          render: (h, { row }) =>
            h("span", row.interval + timeUnitNames[row.timeUnit]),
        },
        {
          title: "描述",
          key: "description",
        },
        {
          title: "创建时间",
          key: "registerTimestamp",
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
                popTipTitle: "确定要删除这个流程？",
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
            const issueButton = h(
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
                    this.modalControl = true;
                    this.issueProcess = row;
                  },
                },
              },
              "下发管理"
            );
            const buttons = [issueButton, editButton, deleteButton];
            return h("div", buttons);
          },
        },
      ],
    };
  },
  computed: {
    ...mapState({
      modelList: (state) => state.modelManagement.modelList,
    }),
  },
  methods: {
    ...mapMutations(["setModel"]),
    ...mapActions(["getAllModelListAction", "deleteModelAction"]),
    handleEdit(data) {
      this.setModel(data);
      this.$router.push({ path: "modify_model" });
    },
    handleDelete(id) {
      this.deleteModelAction(id)
        .then(() => this.$Message.success("删除成功"))
        .catch((err) => this.$Message.error(err.message));
    },
  },
  mounted() {
    this.loading = true;
    this.getAllModelListAction();
    this.$nextTick(() => {});
    this.loading = false;
  },
};
</script>
