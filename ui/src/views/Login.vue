<template>
  <div id="loginContainer">


    <div id="loginForm">
      <img src="../assets/logo-tm.png" alt="" width="300">
      <a-form-model :form="loginForm">
        <a-input placeholder="请输入账号" class="loginInput" type="text" :allowClear="true" v-focus
                 v-model="loginForm.username">
          <a-icon slot="prefix" type="user"/>
        </a-input>
        <a-input placeholder="请输入密码" class="loginInput" type="password" :allowClear="true"
                 v-model="loginForm.password">
          <a-icon slot="prefix" type="lock"/>
        </a-input>


        <div id="loginCtl">
          <a-button type="primary" class="button" @click="login">
            <a-icon type="login"></a-icon>
            登录
          </a-button>

          <a-button type="danger" class="button" @click="reset">
            <a-icon type="reload"></a-icon>
            重置
          </a-button>
        </div>
      </a-form-model>
    </div>

  </div>
</template>


<script>

  import authApi from '../api/AuthApi'

  export default {
    data() {
      return {
        loginForm: {
          username: '',
          password: ''
        }
      }
    }, beforeMount() {
    }, methods: {
      login() {
        authApi.login(this.loginForm)
        .then(res => {
          let {Code, Data} = res.data
          if (Code === 'OK') {
            localStorage.setItem('token', `Bearer ${Data}`)
            this.$router.push("/content")
          }
        })
      },
      reset() {
        this.loginForm = {}
      }
    }
  }
</script>

<style scoped>
  #loginContainer {
    width: 100%;
    height: 100%;
    background-color: lightgrey;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  #loginForm {
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    margin-top: -100px;
    padding: 30px;
    border-radius: 20px;

  }

  #loginCtl {
    margin-top: 40px;
    width: 400px;
    display: flex;
    justify-content: space-around;
    margin-bottom: 40px;
  }

  .loginTitle {
    text-align: center
  }

  .loginInput {
    margin-top: 30px;
  }

  .button {

  }


</style>
