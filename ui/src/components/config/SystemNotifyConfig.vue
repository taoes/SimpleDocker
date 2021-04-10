<template>
  <div>
    <a-form-model v-model="url" :label-col="{span:2}" :wrapper-col="{span:22}">
      <a-form-model-item label="钉钉通知URL">
        <a-input placeholder="请输入钉钉通知链接" v-model="url.notifyUrl"/>
      </a-form-model-item>

    </a-form-model>

    <a-space>
      <a-button icon="question-circle" @click="testNotifyUrl">测试</a-button>
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
        notifyUrl: ''
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
    }, async testNotifyUrl() {
      let res = await systemConfigApi.testNotifyUrl(this.url.notifyUrl)
      let Data = res.data
      this.$info({title: "响应结果", content: Data, okText: "我知道了"});
    }
  }
}
</script>

<style scoped>

</style>