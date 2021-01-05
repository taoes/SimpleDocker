<template>
  <a-menu
      mode="inline"
      v-model="currentMenuKey"
      @select="selectItem"
      :default-selected-keys="['/']"
      :inline-collapsed="true"
      :style="{ height: '100%', borderRight: 0 }"
  >
    <a-menu-item key="/">
      <a-icon type="user"/>
      <span class="menuItem">系统信息</span>
    </a-menu-item>


    <a-menu-item key="/image">
      <a-icon type="laptop"/>
      <span class="menuItem"> 镜像管理</span>
    </a-menu-item>


    <a-menu-item key="/container">
      <a-icon type="container"/>
      <span class="menuItem"> 容器管理</span>
    </a-menu-item>


    <a-menu-item key="/volume">
      <a-icon type="folder-open"/>
      <span class="menuItem">存储管理</span>
    </a-menu-item>


    <a-menu-item key="/network">
      <a-icon type="deployment-unit"/>
      <span class="menuItem"> 网络管理</span>
    </a-menu-item>


    <!--    <a-menu-item key="/secret">-->
    <!--      <a-icon type="key"/>-->
    <!--      <span> 安全认证</span>-->
    <!--    </a-menu-item>-->

    <a-menu-item key="/setting">
      <a-icon type="setting"/>
      <span class="menuItem"> 系统设置</span>
    </a-menu-item>
  </a-menu>
</template>

<script>
  import {mapMutations} from "vuex";

  export default {
    name: "PCMenu",
    computed: {
      currentMenuKey: function () {
        return this.$store.state.menu.currentMenuKey;
      }
    },
    methods: {
      ...mapMutations({
        setCurrentMenuKey: 'setCurrentMenuKey'
      }),
      selectItem: function ({key}) {
        this.$router.push(key)
        this.setCurrentMenuKey(key)
      }
    }
  }
</script>

<style>
  .menuItem {
    color: #000c17;
  }
</style>




