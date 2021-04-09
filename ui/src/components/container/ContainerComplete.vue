<template>
  <div style="display: flex;justify-content: center;flex-direction: column">
    <a-alert message="确定您的配置" :description="message" type="success" show-icon/>


    <span>{{ form }}</span>

    <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item :wrapper-col="{ span: 14, offset: 7 }">

        <a-space>
          <a-button style="margin-left: 10px;" @click="$parent.upStep()">
            上一步
          </a-button>

          <a-button style="margin-left: 10px;" @click="$parent.cancelRunNewContainer" type="danger">
            取消创建
          </a-button>


          <a-button type="primary" style="margin-left: 10px;" @click="$parent.startRunContainer()">
            确定创建
          </a-button>
        </a-space>
      </a-form-model-item>
    </a-form-model>
  </div>

</template>

<script>

export default {
  name: "ContainerComplete",
  props: {
    form: Object,
  },
  data() {
    return {
      message: '恭喜您完成容器运行前的各项配置，现在请检查配置是否正确，如果正确请点击 \'确定创建\' 按钮开始创建容器!',
      labelCol: {span: 4},
      wrapperCol: {span: 14},
      addBtnCol: {
        wrapperCol: {
          xs: {span: 24, offset: 0},
          sm: {span: 24, offset: 4},
        },
      }
    }
  }, computed: {}
}
</script>

<style scoped>

.center {
  text-align: center;
}

</style>