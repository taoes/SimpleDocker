<template>
  <a-row :gutter="16">
    <a-col :span="6">
      <a-statistic title="容器数" :value="info.ContainersRunning" style="margin-right: 50px">
        <template #suffix>
          <span> / {{ info.Containers }}</span>
        </template>
      </a-statistic>
    </a-col>

    <a-col :span="6">
      <a-statistic title="镜像数" :value="info.Images" class="demo-class">
        <template #suffix>
          <span> 层</span>
        </template>
      </a-statistic>
    </a-col>

    <a-col :span="6">
      <a-statistic title="CPU" :value="info.NCPU" class="demo-class">
        <template #suffix>
          <span> 核</span>
        </template>
      </a-statistic>
    </a-col>

    <a-col :span="6">
      <a-statistic title="内存限制" :value="(info.MemTotal /1000000) .toFixed(2)" class="demo-class">
        <template #suffix>
          <span> M </span>
        </template>
      </a-statistic>
    </a-col>

  </a-row>
</template>

<script>
export default {
  name: "DockerStatistics",
  props: {
    version: Object,
    info: Object
  }
}
</script>

<style scoped>

</style>