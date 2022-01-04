<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" class="login-tip" title="边缘计算软件系统 —— 云端登录" :bordered="false">
        <div class="form-con">
          <div v-if="isLogin">
            <login-form @login="handleSubmit"></login-form>
          </div>
          <div v-else>
            <register-form @register="handleRegisterSubmit"></register-form>
          </div>
        </div>
        <Button type="text" v-if="isLogin" @click="isLogin = false">没有账号？马上注册</Button>
        <Button type="text" v-else @click="isLogin = true">已有账号，登录</Button>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import RegisterForm from '_c/register-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm,
    RegisterForm
  },
  data () {
    return {
      isLogin: true
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'handleRegister'
    ]),
    handleSubmit ({ username, password }) {
      this.handleLogin({ username, password }).then(res => {
        this.$router.push({
          name: this.$config.homeName
        })
      }).catch(e => {
        this.$Message.error(e.message)
      })
    },
    handleRegisterSubmit: function ({ username, password, permission }) {
      this.handleRegister({ username, password, permission }).then(res => {
        this.$router.push({
          name: this.$config.homeName
        })
      }).catch(e => {
        this.$Message.error(e.message)
      })
    }
  }
}
</script>

<style>

</style>
