<template>
  <div>
    <Row type="flex" justify="center">
      <Col span="8">
        <model-form ref="formRef" :submit="handleSubmit" mode="ADD" />
        Create model page
      </Col>
    </Row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ModelForm from "_c/model/form";

export default {
  name: "create-model",
  components: {
    ModelForm,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["insertModelAction"]),
    async handleSubmit(data) {
      let formData = new FormData();
      formData.append("name", data.name);
      formData.append("modelFile", data.modelFile);
      formData.append("interval", data.interval);
      formData.append("owner", data.owner);
      formData.append("timeUnit", data.timeUnit);
      formData.append("description", data.description);
      this.$Spin.show();
      await this.insertModelAction(formData)
        .then(() => {
          this.$Message.success("模型添加成功");
          this.$refs.formRef.handleReset();
        })
        .catch((err) => this.$Message.error(err.message))
        .finally(() => this.$Spin.hide());
    },
  },
};
</script>

<style scoped>
</style>
