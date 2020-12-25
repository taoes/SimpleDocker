<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header">
      <div class="logo"></div>
      <a-menu
          theme="dark"
          mode="horizontal"
          :selectable="false"
          @click="linkSelect"
          :style="{ lineHeight: '64px' }">
        <a-menu-item key="https://www.zhoutao123.com">
          <a-icon type="book" theme="filled"/>
          文档
        </a-menu-item>
        <a-menu-item key="https://github.com/taoes/SimpleDocker">
          <a-icon type="code" theme="filled"/>
          源码
        </a-menu-item>
        <a-menu-item key="https://github.com/taoes/SimpleDocker/issues">
          <a-icon type="bug" theme="filled"/>
          反馈
        </a-menu-item>

        <a-menu-item style="float: right;color: green;font-weight: bold">
          <a-icon type="wifi" size="16"/>
          <span style="font-weight: bold;color: white">连接正常</span>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
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
      };
    }, methods: {
      linkSelect: function ({key}) {
        window.open(key, '_target')
      }
    }
  };
</script>

<style>


  .ant-layout {
    height: 100%;
  }

  #components-layout-demo-top-side-2 .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 28px 16px 0;
    float: left;
  }

  .layoutContent {
    background: #fff;
    padding: 24px;
    margin: 0;
    minHeight: '280px';
  }


</style>
