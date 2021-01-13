<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header">
      <!--      <div class="logo"></div>-->
      <div style="display: inline;float: left;justify-items: center">
        <img src="../assets/logo-tm-white2.png"
             style="width: 150px" alt=""/>
      </div>
      <a-menu
          theme="dark"
          mode="horizontal"
          :selectable="false"
          @click="linkSelect"
          :style="{ lineHeight: '64px' }">
        <a-menu-item :class="{'apiStateNormal': apiState,'apiStateError':!apiState}" key="noAction">
          <template v-if="apiState">
            <a-icon type="api" size="16"/>
            <span>连接正常</span>
          </template>
          <template v-else>
            <a-icon type="disconnect" size="16"/>
            <span>连接中断</span>
          </template>
        </a-menu-item>

        <a-sub-menu class="right">
          <template slot="title">
            <a-icon type="user"></a-icon>
            账户
          </template>

          <a-menu-item key="updatePassword">
            <a-icon type="lock"></a-icon>
            修改密码
          </a-menu-item>

          <a-menu-item key="logout">
            <a-icon type="logout"></a-icon>
            退出登录
          </a-menu-item>
        </a-sub-menu>


        <a-menu-item key="https://www.zhoutao123.com" class="right">
          <a-icon type="book" theme="filled"/>
          博客
        </a-menu-item>
        <a-menu-item key="https://gitee.com/taoes_admin/SimpleDocker" class="right">
          <a-icon type="code" theme="filled"/>
          源码
        </a-menu-item>
        <a-menu-item key="https://gitee.com/taoes_admin/SimpleDocker/issues" class="right">
          <a-icon type="bug" theme="filled"/>
          反馈
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout style="padding:0">
        <a-layout-content class="layoutContent">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>

    <a-modal :visible="showResetPasswordModal" title="修改登录密码" okText="确定" cancelText="取消"
             @cancel="showResetPasswordModal = false"
             @ok="callResetPassword()">
      <a-form-model :form="updatePasswordForm">
        <a-input class="input" placeholder="请输入原密码" type="password"
                 v-model="updatePasswordForm.oP"/>
        <br>
        <a-input class="input" placeholder="请输入新密码" type="password"
                 v-model="updatePasswordForm.nP"/>
        <br>
        <a-input class="input" placeholder="请再次输入新密码" type="password"
                 v-model="updatePasswordForm.cP"/>
      </a-form-model>
    </a-modal>
  </a-layout>
</template>
<script>
  import PCMenu from "../components/PCMenu";
  import ResetPassword from "../components/ResetPassword";
  import AuthApi from "../api/AuthApi";

  let intervalId = null

  export default {
    components: {ResetPassword, PCMenu},
    data() {
      return {
        collapsed: false,
        apiState: true,
        showResetPasswordModal: false,
        updatePasswordForm: {
          oP: '',
          nP: '',
          cP: ''
        }
      };
    }, mounted() {
      setInterval(this.updateApiState, 5000);
    }, beforeDestroy() {
      if (intervalId != null) {
        console.log("清除定时器")
        clearInterval(intervalId)
      }
    }, methods: {
      updateApiState: function () {
        this.$axios.get('/api/docker/ping').then((res) => {
          let {Code} = res.data;
          this.apiState = Code === 'OK';
        }).catch(() => {
          this.apiState = false;
        });
      },
      linkSelect: function ({key}) {
        if (key && key.startsWith("no")) {
          return
        }
        if (key === 'logout') {
          localStorage.setItem('token', '')
          this.$router.push("/")
        } else if (key === 'updatePassword') {
          this.showResetPasswordModal = true
        } else {
          window.open(key, '_target')

        }
      }, callResetPassword() {
        AuthApi.resetPassword(this.updatePasswordForm)
        .then(res => {
          let {Code} = res.data
          if (Code === 'OK') {
            this.showResetPasswordModal = false
            this.$message.info("密码更新成功，请退出重新登录!")
            localStorage.setItem("token", "")
            this.$router.push("/")
          }
        })
      }
    }
  }
  ;
</script>

<style scoped>
  .ant-layout {
    height: 100%;
  }

  #components-layout-demo-top-side-2 .logo {
    width: 120px;
    height: 31px;

    float: left;
  }

  .layoutContent {
    background: #0a0a0a;
    margin: 0;
    minHeight: '280px';
  }

  .right {
    float: right;
  }

  .apiStateNormal {
    float: right;
    color: green !important;;
    font-weight: bold
  }

  .apiStateError {
    float: right;
    color: red !important;
    font-weight: bold
  }


  .input {
    margin-top: 20px;
  }

</style>
