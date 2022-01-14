<template>
  <div>
    <Row type="flex" justify="center">
      <Col span="8">
        <model-form
          ref="formRef"
          :submit="handleSubmit"
          :modelData="this.modelData"
          mode="EDIT"
        />
      </Col>
    </Row>
  </div>
</template>

<script>
import ModelForm from "_c/model/form";
import { mapState, mapActions } from "vuex";

export default {
  name: "modify-model",
  components: {
    ModelForm,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      modelData: (state) => {
        return state.modelManagement.modelData;
      },
    }),
  },
  methods: {
    ...mapActions(["updateModelAction"]),
    handleSubmit(data) {
      this.$Spin.show();
      data = { ...data, id: this.modelData.id };
      //   let formData = new FormData();
      //   formData.append("name", data.name);
      //   formData.append("interval", data.interval);
      //   formData.append("owner", data.owner);
      //   formData.append("timeUnit", data.timeUnit);
      //   formData.append("description", data.description);
      //   formData.append("id", this.modelData.id);
      this.updateModelAction({ id: this.modelData.id, modelInfo: data })
        .then(() => {
          this.$Message.success("模型修改成功");
        })
        .catch((err) => this.$Message.error(err.message))
        .finally(() => this.$Spin.hide());
    },
  },
};
</script>

<style scoped>
</style>
