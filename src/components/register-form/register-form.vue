<template>
  <Form ref="registerForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="username">
      <Input v-model="form.username" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password_confirm">
      <Input type="password" v-model="form.password_confirm" placeholder="确认密码">
          <span slot="prepend">
            <Icon :size="14" type="md-lock"></Icon>
          </span>
      </Input>
    </FormItem>
    <FormItem>
      <div align="left" style="color: black">请选择用户角色：</div>
      <Select v-model="form.permission">
          <Option :value="item" v-for="(item, index) in userPermission" v-bind:key="index">{{userPermissionNames[item]}}</Option>
      </Select>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>注册</Button>
    </FormItem>
  </Form>
</template>
<script>
import { userPermission, userPermissionNames } from '@/constants/user'
export default {
  name: 'RegisterForm',
  props: {
  },
  data () {
    const pwdAgainCheck = (rule, value, callback) => {
      if (value.length < 1) {
        return callback(new Error('重复密码不能为空！'))
      } else if (this.form.password !== this.form.password_confirm) {
        return callback(new Error('两次输入密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      userPermissionNames,
      userPermission,
      form: {
        username: '',
        password: '',
        password_confirm: '',
        permission: userPermission[0]
      },
      ruleValidate: {
        usernameRules: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        passwordRules: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        passwordConfirmRules: [
          { required: true, validator: pwdAgainCheck, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.form.permission = userPermission[0]
  },
  computed: {
    rules () {
      return {
        username: this.ruleValidate.usernameRules,
        password: this.ruleValidate.passwordRules,
        password_confirm: this.ruleValidate.passwordConfirmRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.$emit('register', {
            username: this.form.username,
            password: this.form.password,
            permission: this.form.permission
          })
        }
      })
    }
  }
}
</script>
