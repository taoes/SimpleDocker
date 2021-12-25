<template>
  <div id="loginPage">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md flex column"
    >
      <span class="title">SimpleDocker</span>
      <q-input
        v-model="name"
        :label="$t('username')"
        hint="Name and surname"
        square outlined
      />

      <q-input
        type="password"
        v-model="age"
        :label="$t('password')"

        square outlined
      />

      <div>
        <q-btn :label="$t('login')" type="submit" color="primary"/>
        <q-btn :label="$t('reset')" type="reset" color="primary" flat class="q-ml-sm"/>
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    onSubmit() {
      localStorage.setItem('TOKEN', "123")
      this.$router.push("/app/index")
      this.$q.notify({
        message: '登录成功，欢迎您！',
        position: 'top',
        color: 'purple',
        icon: 'fab fa-docker'
      })
    },
    onReset() {
      this.name = null
      this.age = null
      this.accept = false
    }
  }, mounted() {
    let {tip} = this.$route.params
    if (!!tip) {
      this.$q.notify({
        message: tip,
        position: 'top',
        color: 'purple',
        icon: 'fab fa-docker'
      })
    }
  },
  data() {
    return {
      name: null,
      age: null,
      accept: false
    }
  }
}
</script>

<style scoped>

#loginPage {
  background-color: white;
  padding: 20px;
}

.title {
  font-size: 45px;
  width: 600px;
  text-align: center;
  font-style: oblique;
}
</style>
