<template>
  <div>
    <a-descriptions title="宿主机 系统信息" bordered size="small">
      <a-descriptions-item label="操作系统" :span="1">
        {{ info.OS }}
      </a-descriptions-item>


      <a-descriptions-item label="主机名" :span="1">
        {{ info.HostName }}
      </a-descriptions-item>

      <a-descriptions-item label="CPU架构" :span="1">
        {{ info.Arch }}
      </a-descriptions-item>

      <a-descriptions-item label="CPU核心" :span="1">
        {{ info.Core }}
      </a-descriptions-item>

    </a-descriptions>
  </div>
</template>

<script>
import {formatUTCTime} from '@/utils'

export default {
  name: "SystemInfo",
  props: {
    info: Object
  },
  methods: {
    formatUTCTime: formatUTCTime
  }
}
</script>

<style scoped>

</style>