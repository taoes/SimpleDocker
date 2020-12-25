<template>
  <a-menu
      mode="inline"
      @select="selectItem"
      :default-selected-keys="['/']"
      :style="{ height: '100%', borderRight: 0 }"
  >
    <a-menu-item key="/">
      <a-icon type="user"/>
      系统信息
    </a-menu-item>


    <a-menu-item key="/image">
      <a-icon type="laptop"/>
      镜像管理
    </a-menu-item>


    <a-menu-item key="/container">
      <a-icon type="container"/>
      容器管理
    </a-menu-item>


    <a-menu-item key="/volume">
      <a-icon type="folder-open"/>
      存储管理
    </a-menu-item>


    <a-menu-item key="/network">
      <a-icon type="deployment-unit"/>
      网络管理
    </a-menu-item>


    <a-menu-item key="/secret">
      <a-icon type="key"/>
      安全认证
    </a-menu-item>

    <a-menu-item key="/setting">
      <a-icon type="setting"/>
      系统设置
    </a-menu-item>
  </a-menu>
</template>

<script>
  export default {
    name: "PCMenu", methods: {
      selectItem: function ({key}) {
        this.$router.push(key)
      }
    }
  }
</script>




