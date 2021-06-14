<template>
    <div id="loginContainer">
        <div id="loginForm">
            <img src="../assets/logo-tm.png" alt="" style="width: 300px">
            <a-form-model :form="loginForm">
                <a-input placeholder="请输入账号" class="loginInput" type="text" :allowClear="true" v-focus
                         @keydown.enter="login"
                         v-model="loginForm.username">
                    <a-icon slot="prefix" type="user"/>
                </a-input>
                <a-input placeholder="请输入密码" class="loginInput" type="password" :allowClear="true"
                         @keydown.enter="login"
                         v-model="loginForm.password">
                    <a-icon slot="prefix" type="lock"/>
                </a-input>

                <div id="slideStyle">
                    <a-input placeholder="请输入验证码" class="loginInput" type="text" :allowClear="true"
                             @keydown.enter="login"
                             v-model="loginForm.verityCode" style="padding-right: 0">
                        <a-icon slot="prefix" type="code"/>
                        <vue-captcha
                                :height="30"
                                slot="addonAfter"
                                ref="captcha"
                                captcha.sync="code"
                                @on-change="changeCaptcha"/>
                    </a-input>
                </div>


                <div id="loginCtl">
                    <a-button type="primary" class="button" @click="login">
                        <a-icon type="login"/>
                        登录
                    </a-button>

                    <a-button type="danger" class="button" @click="reset">
                        <a-icon type="reload"/>
                        重置
                    </a-button>

                    <a-button class="button" @click="openSourcePage">
                        <a-icon type="star"></a-icon>
                        关于
                    </a-button>
                </div>
            </a-form-model>
        </div>
    </div>
</template>


<script>

    import authApi from '../api/AuthApi'
    import VueCaptcha from 'vue-captcha-code';

    export default {
        components: {VueCaptcha},
        data() {
            return {
                rightVerityCode: '',
                loginForm: {
                    username: '',
                    password: '',
                    verityCode: ''
                }
            }
        }, beforeMount() {
        }, methods: {
            login() {
                if (this.loginForm.verityCode.toUpperCase() !== this.rightVerityCode.toUpperCase()){
                    this.$notification['error']({
                        message: '登录失败',
                        description: "验证码错误，请重新输入后重试"
                    })
                    this.$refs.captcha.refreshCaptcha();
                    return
                }
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
                this.$refs.captcha.refreshCaptcha();
            }, openSourcePage() {
                window.open('https://gitee.com/taoes_admin/SimpleDocker', '_blank')
            }, changeCaptcha(code) {
                this.rightVerityCode = code
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
        height: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: white;
        margin-top: -100px;
        padding: 30px;
        border-radius: 10px;

    }

    #loginCtl {
        margin-top: 40px;
        width: 400px;
        display: flex;
        justify-content: space-around;
    }

    .loginInput {
        margin-top: 20px;
    }

    .ant-input-group-addon {
        margin: 0;
        padding: 0 !important;
        border: 0 solid #d9d9d9 !important;
    }


</style>
