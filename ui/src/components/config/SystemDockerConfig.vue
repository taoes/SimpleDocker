<template>

  <a-form-model :label-col="{span:2}" :wrapper-col="{span:20}" v-model="config">
    <a-form-model-item label="创建容器模式">
      <a-radio-group v-model="config.containerCreateMode">
        <span style="margin-left: 20px"></span>
        <a-radio value="complex" name="复杂模式">
          复杂模式
        </a-radio>
        <a-radio value="simple" name="简单模式">
          简单模式
        </a-radio>
      </a-radio-group>
    </a-form-model-item>

    <a-form-model-item label="启用 Docker 日志">
      <span style="margin-left: 20px"></span>
      <a-switch v-model="config.enableDockerLog" checked-children="启用" un-checked-children="关闭"/>
    </a-form-model-item>

    <a-space>
      <a-button type="danger" icon="issues-close">默认</a-button>
      <a-button type="primary" icon="save" @click="save">保存</a-button>
    </a-space>
  </a-form-model>
</template>

<script>

import systemConfigApi from "@/api/SystemConfigApi";

export default {
  name: "SystemDockerConfig",
  data() {
    return {
      config: {
        containerCreateMode: 'complex',
        enableDockerLog: true,
      }
    }
  }, async beforeMount() {
    let res = await systemConfigApi.getDockerConfig();
    let {Code, Data} = res.data
    if (Code === 'OK') {
      let {containerCreateMode, enableDockerLog} = Data
      if (containerCreateMode.trim() === '') {
        this.config.containerCreateMode = "complex"
      } else {
        this.config.containerCreateMode = containerCreateMode;
      }
      this.config.enableDockerLog = enableDockerLog;
    }
  },
  methods: {
    async save() {
      let res = await systemConfigApi.saveDockerConfig(this.config)
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