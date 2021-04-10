<template>
  <div>
    <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol" v-model="form">
      <a-form-model-item label="镜像名称">
        <a-input placeholder="请输入镜像名称" v-model="form.imageTag" disabled/>
      </a-form-model-item>

      <a-form-model-item label="镜像ID">
        <a-input placeholder="请输入镜像ID" v-model="form.imageId" disabled/>
      </a-form-model-item>

      <a-form-model-item label="容器名称">
        <a-input placeholder="请输入容器名称，为空则随机生成" v-model="form.containerName">
          <a-tooltip slot="suffix" title="参数说明">
            <a-icon type="info-circle" @click="showNameInfo()"/>
          </a-tooltip>
        </a-input>
      </a-form-model-item>

      <a-form-model-item label="最大重启次数">
        <a-input placeholder="请输入最大重启次数" v-model="form.maxRestartCount">
          <a-tooltip slot="suffix" title="参数说明">
            <a-icon type="info-circle" @click="showMaxRestartCountInfo()"/>
          </a-tooltip>
        </a-input>
      </a-form-model-item>

      <a-form-model-item label="主机名称">
        <a-input placeholder="请输入主机名称,为空则随机生成" v-model="form.hostname">
          <a-tooltip slot="suffix" title="参数说明">
            <a-icon type="info-circle" @click="showHostNameInfo()"/>
          </a-tooltip>
        </a-input>
      </a-form-model-item>

      <a-form-model-item label="CPU限制">
        <a-input :min="0" type="number" v-model="form.cpuCoreLimit" placeholder="请输入CPU核心使用限制">
          <a-tooltip slot="suffix" title="参数说明">
            <a-icon type="info-circle" @click="showCpuInfo()"/>
          </a-tooltip>
        </a-input>
      </a-form-model-item>

      <a-form-model-item label="内存限制">
        <a-input :min="0" type="number" v-model="form.memoryLimit" placeholder="内存资源使用限制">
          <a-tooltip slot="suffix" title="参数说明">
            <a-icon type="info-circle" @click="showMemoryInfo()"/>
          </a-tooltip>
        </a-input>
      </a-form-model-item>
    </a-form-model>


    <div style="display: flex;justify-content: center;" class="btnGroup">
      <a-space>
        <a-button type="danger" @click="$parent.cancelRunNewContainer">
          <a-icon type="close-circle"/>
          取消创建
        </a-button>
        <a-button type="primary" @click="$parent.nextStep()">
          下一步
          <a-icon type="arrow-right"/>
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContainerBaseInfo",
  data() {
    return {
      form: {},
      labelCol: {span: 4},
      wrapperCol: {span: 20},
    }
  }, mounted() {
    let form = this.form = this.$store.state.container.createContainerStore;
    form.imageTag = this.$route.query.imageTag;
    form.imageId = this.$route.query.imageId;
  }, methods: {
    showCpuInfo() {
      let content = `此参数用于限制容器使用的CPU核心数，使用0的时候表示不限制CPU的使用。当您修改此参数的时候时候，您必须了解到一些镜像可能有最小CPU核心数的要求，如果低于此参数可能会造成容器创建失败`
      this.showInfo('CPU核心数限制说明', content)
    },
    showMemoryInfo() {
      let content = `此参数用于限制容器使用的内存大小，使用0的时候表示不限制内存的使用。当您修改此参数的时候时候，您必须了解到一些镜像可能有最小内存的要求，如果低于此参数可能会造成容器创建或者启动失败`
      this.showInfo('内存参数说明', content)
    }, showHostNameInfo() {
      let content = "此参数设置容器的主机名，当此参数为空值的时候，容器会随机生成主机名！"
      this.showInfo('主机名参数说明', content)
    }, showMaxRestartCountInfo() {
      let content = "此参数设置容器的最大重启次数，当容器停止的时候，其会再次尝试重启，直到重启次数超过此值，当此参数为0的时候，容器不会自动重启！"
      this.showInfo('主机名参数说明', content)
    }, showNameInfo() {
      let content = "此参数设置容器名，当此参数为空值的时候，容器会随机生成容器名！"
      this.showInfo('容器名参数说明', content)
    },
    showInfo(title, content) {
      this.$warning({
        title: title,
        content: content,
        okText: '知道了'
      });
    }
  }
}
</script>

<style scoped>

</style>