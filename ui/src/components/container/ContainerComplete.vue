<template>
  <div>
    <a-alert message="确定您的配置" :description="message" type="success" show-icon/>

    <div style="display: flex;justify-content: center;flex-direction: column">

      <div style="display: flex;justify-content: center;" class="btnGroup">
        <a-button @click="$parent.upStep()">
          <a-icon type="arrow-left"/>
          上一步
        </a-button>

        <a-button @click="$parent.cancelRunNewContainer" type="danger">
          <a-icon type="close-circle"/>
          取消创建
        </a-button>

        <a-button type="primary" style="margin-left: 10px;" @click="createContainer">
          <a-icon type="check-circle"/>
          确定创建
        </a-button>
      </div>
    </div>
  </div>

</template>

<script>

import containerApi from '@/api/ContainerApi'

export default {
  name: "ContainerComplete",
  data() {
    return {
      form: {},
      message: '恭喜您完成容器运行前的各项配置，现在请检查配置是否正确，如果正确请点击 \'确定创建\' 按钮开始创建容器!',
      labelCol: {span: 4},
      wrapperCol: {span: 20},

      addBtnCol: {
        wrapperCol: {
          xs: {span: 24, offset: 0},
          sm: {span: 24, offset: 4},
        },
      }
    }
  }, mounted() {
    this.form = this.$store.state.container.createContainerStore;
  }, methods: {
    async createContainer() {
      let resp = await containerApi.createNewContainer(this.form)
      let {Data, Code, Msg} = resp.data;
      let that = this;
      if (Code === 'OK') {
        this.$info({
          title: '容器创建成功',
          content: `容器已经创建成功并启动,容器ID=${Data}`,
          okText: '查看容器',
          onOk() {
            that.$router.push(`/content/container?searchKey=${Data}`)
          }
        });
      } else {
        this.$error({
          title: '容器创建失败或启动异常',
          content: `异常原因:${Msg}`,
          okText: '知道了'
        });
      }
    }
  }
}
</script>

<style scoped>

.center {
  text-align: center;
}

</style>