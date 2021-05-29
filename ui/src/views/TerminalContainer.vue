<template>
    <a-layout id="components-layout-demo-top-side-2">
        <a-layout-header class="header">
            <div style="display: inline;float: left;justify-items: center">
                <img src="../assets/logo-tm-white2.png" class="logoImg" alt=""/>
                <h2 class="logoTitle">{{title}}</h2>
            </div>


            <a-menu
                    theme="dark"
                    mode="horizontal"
                    :selectable="false"
                    @click="linkSelect"
                    :style="{ lineHeight: '64px' }">
                <a-menu-item :class="{apiStateNormal: apiState,apiStateError:!apiState}" key="noAction">
                    <template v-if="apiState">
                        <a-icon type="api" size="16"/>
                        <span>连接正常</span>
                    </template>
                    <template v-else>
                        <a-icon type="disconnect" size="16"/>
                        <span>连接中断</span>
                    </template>
                </a-menu-item>

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
    </a-layout>
</template>
<script>
    import PCMenu from "../components/PCMenu";
    import ResetPassword from "../components/ResetPassword";

    let intervalId = null

    export default {
        components: {ResetPassword, PCMenu},
        data() {
            return {
                title: "SimpleDocker 容器操作台",
                collapsed: false,
                apiState: true,
                showResetPasswordModal: false,
            };
        }, mounted() {
            setInterval(this.updateApiState, 5000);
             let {title} = this.$route.query;
             if (!!title){
               this.title = title
             }

        }, beforeDestroy() {
            if (intervalId != null) {
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
        margin: 0;
        minHeight: 280px;
    }

    .right {
        float: right;
        color: white;
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

    .logoImg {
        width: 200px;
        position: absolute;
        top: 12px;
        left: 34px;
        clip: rect(0px 67px 42px 0px);
    }

    .logoTitle {
        margin-left: 59px;
        color: white;
        font-weight: 900;
    }


    .logoVersion {
        font-size: 15px;
        font-weight: 400;
        color: whitesmoke;
    }
</style>
