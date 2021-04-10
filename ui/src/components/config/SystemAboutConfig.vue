<template>
  <div>
    <a-alert :description="desc" type="success"></a-alert>
    <a-button type="link" @click="window.open('https://gitee.com/taoes_admin/SimpleDocker','_blank')"/>
    <a-button type="link" @click="window.open('https://gitee.com/taoes_admin/SimpleDocker','_blank')"/>
    <a-button type="link" @click="window.open('https://www.zhoutao123.com','_blank')"/>
  </div>
</template>

<script>
export default {
  name: "SystemAboutConfig",
  data() {
    return {
      desc: "SimpleDocker 是一个简单的Docker控制面板，致力于可以让开发者更方便，更无障碍的使用Docker, 其界面简洁，操作便捷，更多功能欢迎探索 !"
    }
  }
}
</script>

<style scoped>

</style>