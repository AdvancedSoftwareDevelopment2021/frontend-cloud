<template>
  <Form ref="formRef" :model="form" :rules="rules">
    <h2>模型信息</h2>
    <FormItem label="模型名称" prop="name"
      ><Input v-model="form.name"></Input
    ></FormItem>
    <FormItem label="描述" prop="description"
      ><Input v-model="form.description"></Input
    ></FormItem>
    <FormItem label="是否更新" prop="train">
      <RadioGroup v-model="form.train">
        <Radio label="true">
          <span>是</span>
        </Radio>
        <Radio label="false">
          <span>否</span>
        </Radio>
      </RadioGroup>
    </FormItem>
    <FormItem v-if="form.train === 'true'" label="时间间隔" prop="interval"
      ><Input v-model="form.interval"></Input
    ></FormItem>
    <FormItem v-if="form.train === 'true'" label="单位" prop="timeUnit">
      <Select v-model="form.timeUnit">
        <Option
          v-for="(item, index) in timeUnits"
          :key="index"
          :label="timeUnitNames[item]"
          :value="item"
        /> </Select
    ></FormItem>
    <FormItem v-if="mode === 'ADD'" label="上传模型文件" prop="modelFile">
      <Upload action="/" :before-upload="handleUpload">
        <Button icon="ios-cloud-upload-outline">选择文件</Button>
      </Upload>
      <div v-if="form.modelFile !== null">
        Upload file: {{ form.modelFile.name }}
      </div>
    </FormItem>
    <FormItem
      v-if="mode === 'ADD' && form.train === 'true'"
      label="上传云端模型训练脚本"
      prop="trainScriptFile"
    >
      <Upload action="/" :before-upload="handleTrainScriptUpload">
        <Button icon="ios-cloud-upload-outline">选择文件</Button>
      </Upload>
      <div v-if="form.trainScriptFile !== null">
        Upload file: {{ form.trainScriptFile.name }}
      </div>
    </FormItem>
    <FormItem
      v-if="mode === 'ADD'"
      label="上传检测脚本"
      prop="predictScriptFile"
    >
      <Upload action="/" :before-upload="handlePredictScriptUpload">
        <Button icon="ios-cloud-upload-outline">选择文件</Button>
      </Upload>
      <div v-if="form.predictScriptFile !== null">
        Upload file: {{ form.predictScriptFile.name }}
      </div>
    </FormItem>
    <FormItem class="footer">
      <Button type="primary" @click="handleSubmit()">提交</Button>
      <Button @click="handleReset()">重置</Button>
    </FormItem>
  </Form>
</template>
<style scoped>
button {
  margin-right: 8px;
}
.footer {
  margin-top: 50px;
}
</style>
<script>
import {
  intervalValidator,
  requiredBlur as required,
} from "@/libs/form.validation";
import { getOr } from "lodash/fp";
import { timeUnitNames, timeUnits, DAY } from "@/constants/timeUnits";

export default {
  props: {
    submit: { type: Function },
    modelData: { type: Object, default: null },
    mode: { type: String },
  },
  data() {
    /**
     * 默认表单信息
     */
    const form = {
      name: getOr("")("name")(this.modelData),
      description: getOr("")("description")(this.modelData),
      interval: getOr("")("interval")(this.modelData).toString(),
      timeUnit: getOr(DAY)("timeUnit")(this.modelData),
      owner: this.$store.state.user.userId,
      train: "true",
      modelLoadingStatus: false,
      modelFile: null,
      trainScriptFile: null,
      predictScriptFile: null,
    };
    const validateUpload = (rule, value, callback) => {
      if (value === null) {
        callback(new Error("请选择要上传的文件"));
      } else {
        callback();
      }
    };

    return {
      /**
       * 表单数据对象
       */
      form,
      timeUnits,
      timeUnitNames,
      /**
       * 表单验证规则
       */
      rules: {
        name: [required("名称不可为空")],
        // api: [ { validator: apiValidator, trigger: 'blur' } ],
        interval: [
          required("时间间隔不可为空"),
          { validator: intervalValidator, trigger: "blur" },
        ],
        modelFile: [
          { request: true, validator: validateUpload, trigger: "change" },
        ],
        trainScriptFile: [
          { request: true, validator: validateUpload, trigger: "change" },
        ],
        predictScriptFile: [
          { request: true, validator: validateUpload, trigger: "change" },
        ],
      },
    };
  },
  methods: {
    /**
     * 提交表单
     */
    handleSubmit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.submit({ ...this.form });
        }
      });
    },
    /**
     * 表单重置
     */
    handleReset() {
      this.$refs.formRef.resetFields();
    },
    handleUpload(file) {
      this.form.modelFile = file;
      return false;
    },
    handleTrainScriptUpload(file) {
      this.form.trainScriptFile = file;
      return false;
    },
    handlePredictScriptUpload(file) {
      this.form.predictScriptFile = file;
      return false;
    },
  },
  mounted() {},
};
</script>
