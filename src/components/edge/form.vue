<template>
  <Form ref="formRef" :model="form" :rules="rules">
    <h2>基本信息</h2>
    <FormItem label="边缘端名称" prop="name"><Input v-model="form.name"></Input></FormItem>
    <FormItem label="描述" prop="description"><Input v-model="form.description"></Input></FormItem>
    <FormItem label="ip" prop="ip"><Input v-model="form.ip"></Input></FormItem>
    <FormItem label="port" prop="port"><Input v-model="form.port"></Input></FormItem>
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

  .auto-margin {
    margin: auto;
  }

  .new-column {
    float: right;
    margin-top: 5px;
    margin-right: 0;
  }

  .footer {
    margin-top: 50px;
  }
</style>
<script>
import { portValidator, requiredBlur as required } from '@/libs/form.validation'

export default {
  props: { submit: { type: Function } },
  data () {
    /**
       * 默认表单信息
       */
    const form = { name: '', description: '' }
    return {
      /**
         * 表单数据对象
         */
      form,
      /**
         * 表单验证规则
         */
      rules: {
        name: [required('名称不可为空')],
        ip: [required('ip地址不可为空')],
        port: [required('端口号不可为空'), { validator: portValidator, trigger: 'blur' }]
      }
    }
  },
  methods: {
    /**
       * 提交表单
       */
    handleSubmit () {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.submit({ ...this.form })
        }
      })
    },
    /**
       * 表单重置
       */
    handleReset () {
      this.$refs.formRef.resetFields()
    }
  }
}
</script>
