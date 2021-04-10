<template>
  <div>
    <a-form-model v-model="url" :label-col="{span:2}" :wrapper-col="{span:22}">
      <a-form-model-item label="容器停止运行">
        <a-input placeholder="请输入钉钉通知链接" v-model="url.containerStopNotifyUrl"/>
      </a-form-model-item>

      <a-form-model-item label="容器被删除">
        <a-input placeholder="请输入钉钉通知链接" v-model="url.containerDeleteNotifyUrl"/>
      </a-form-model-item>

      <a-form-model-item label="镜像被删除">
        <a-input placeholder="请输入钉钉通知链接" v-model="url.imageDeleteNotifyUrl"/>
      </a-form-model-item>
    </a-form-model>

    <a-space>
      <a-button icon="question-circle">测试</a-button>
      <a-button type="primary" icon="save" @click="save">保存</a-button>
    </a-space>
  </div>
</template>

<script>
import systemConfigApi from '@/api/SystemConfigApi'

export default {
  name: "SystemNotifyConfig",
  data() {
    return {
      url: {
        containerStopNotifyUrl: '',
        containerDeleteNotifyUrl: '',
        imageDeleteNotifyUrl: '',
      }
    }
  }, async beforeMount() {
    let res = await systemConfigApi.getNotifyConfig();
    let {Code, Data} = res.data
    if (Code === 'OK') {
      this.url = Data
    }
  }, methods: {
    async save() {
      let res = await systemConfigApi.saveNotifyConfig(this.url)
      let {Code} = res.data
      if (Code === 'OK') {
        this.$message.info('配置保存成功');
      }
    }
  }
}
</script>

<style scoped>

</style>