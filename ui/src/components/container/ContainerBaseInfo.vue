<template>
  <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol" v-model="form">
    <a-form-model-item label="镜像名称">
      <a-input placeholder="请输入容器名称" v-model="form.imageTag" disabled/>
    </a-form-model-item>

    <a-form-model-item label="镜像ID">
      <a-input placeholder="请输入容器名称"/>
    </a-form-model-item>

    <a-form-model-item label="容器名称">
      <a-input placeholder="请输入容器名称"/>
    </a-form-model-item>

    <a-form-model-item label="自动重启">
      <a-select default-value="0">
        <a-select-option value="0">否</a-select-option>
        <a-select-option value="1">是</a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item label="主机名称">
      <a-input placeholder="请输入容器名称"/>
    </a-form-model-item>

    <a-form-model-item label="CPU使用">
      <a-input :min="1" type="number" v-model="form.cpuCoreLimit" placeholder="请请输入CPU核心使用限制"/>
    </a-form-model-item>

    <a-form-model-item label="内存使用">
      <a-input :min="128" :max="maxMemory" type="number" v-model="form.memoryLimit"
               placeholder="请输入内存资源使用限制"/>

    </a-form-model-item>


    <a-form-model-item :wrapper-col="{ span: 14, offset: 9 }">
      <a-space>
        <a-button disabled type="primary">
          上一步
        </a-button>
        <a-button @click="$parent.nextStep()" type="primary">
          下一步
        </a-button>
      </a-space>
    </a-form-model-item>

  </a-form-model>
</template>

<script>
export default {
  name: "ContainerBaseInfo",
  props: {
    form: Object
  },
  data() {
    return {
      labelCol: {span: 4},
      wrapperCol: {span: 14},
      maxCore: 4,
      maxMemory: 9068,

    }
  }, beforeMount() {
    this.form.imageTag = this.$route.query.imageTag;
  }, methods: {}
}
</script>

<style scoped>

</style>