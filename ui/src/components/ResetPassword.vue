<template>
  <div class="resetPassword">
    <a-form-model :form="updatePasswordForm">
      <a-input class="input" placeholder="请输入原密码" type="password"
               v-model="updatePasswordForm.oldPassword"/>
      <br>
      <a-input class="input" placeholder="请输入新密码" type="password"
               v-model="updatePasswordForm.newPassword"/>
      <br>
      <a-input class="input" placeholder="请再次输入新密码" type="password"
               v-model="updatePasswordForm.confirmPassword"/>
    </a-form-model>

  </div>
</template>

<script>
  export default {
    name: 'ResetPassword',
    props: {
      msg: String
    },
    data() {
      return {
        updatePasswordForm: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        }
      }
    }, methods: {

    }
  }
</script>


<style scoped>



</style>
