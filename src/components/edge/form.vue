<template>
  <Form ref="formRef" :model="form" :rules="rules">
    <h2>边缘端信息</h2>
    <FormItem label="边缘端名称" prop="name"><Input v-model="form.name"></Input></FormItem>
    <FormItem label="描述" prop="description"><Input v-model="form.description"></Input></FormItem>
    <FormItem label="主机名或ip地址" prop="ip"><Input v-model="form.ip"></Input></FormItem>
    <FormItem label="端口" prop="port"><Input v-model="form.port"></Input></FormItem>
    <FormItem label="连接路径" prop="api"><Input v-model="form.api"></Input></FormItem>
    <FormItem label="时间间隔" prop="interval"><Input v-model="form.interval"></Input></FormItem>
    <FormItem label="单位" prop="timeUnit">
      <Select v-model="form.timeUnit">
        <Option v-for="(item, index) in timeUnits"
                :key="index"
                :label="timeUnitNames[item]"
                :value="item"/>
      </Select></FormItem>
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
import { portValidator, intervalValidator, apiValidator, requiredBlur as required } from '@/libs/form.validation'
import { getOr } from 'lodash/fp'
import { timeUnitNames, timeUnits, DAY } from '@/constants/timeUnits'

export default {
  props: {
    submit: { type: Function },
    edgeData: { type: Object, default: null }
  },
  data () {
    /**
       * 默认表单信息
       */
    const form = {
      name: getOr('')('name')(this.edgeData),
      description: getOr('')('description')(this.edgeData),
      ip: getOr('')('ip')(this.edgeData),
      port: getOr('')('port')(this.edgeData).toString(),
      api: getOr('')('api')(this.edgeData),
      interval: getOr('')('interval')(this.edgeData).toString(),
      timeUnit: getOr(DAY)('timeUnit')(this.edgeData),
      owner: this.$store.state.user.userId
    }
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
        name: [required('名称不可为空')],
        ip: [required('主机名或ip地址不可为空')],
        port: [required('端口号不可为空'), { validator: portValidator, trigger: 'blur' }],
        api: [ { validator: apiValidator, trigger: 'blur' } ],
        interval: [required('时间间隔不可为空'), { validator: intervalValidator, trigger: 'blur' }]
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
