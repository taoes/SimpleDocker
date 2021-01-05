<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header">
      <!--      <div class="logo"></div>-->
      <h1 class="logo" style="color: white">SimpleDocker</h1>
      <a-menu
          theme="dark"
          mode="horizontal"
          :selectable="false"
          @click="linkSelect"
          :style="{ lineHeight: '64px' }">
        <a-menu-item :class="{'apiStateNormal': apiState,'apiStateError':!apiState}">
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
        <a-menu-item key="https://github.com/taoes/SimpleDocker" class="right">
          <a-icon type="code" theme="filled"/>
          源码
        </a-menu-item>
        <a-menu-item key="https://github.com/taoes/SimpleDocker/issues/new" class="right">
          <a-icon type="bug" theme="filled"/>
          反馈
        </a-menu-item>


      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider style="background: #fff;width: 256px">
        <PCMenu></PCMenu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <div style="height: 20px"></div>
        <a-layout-content class="layoutContent">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
  import PCMenu from "./components/PCMenu";

  export default {
    components: {PCMenu},
    data() {
      return {
        collapsed: false,
        apiState: true
      };
    }, mounted() {
      setInterval(this.updateApiState, 5000);
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
        window.open(key, '_target')
      }
    }
  };
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
    background: #fff;
    padding: 24px;
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


</style>
