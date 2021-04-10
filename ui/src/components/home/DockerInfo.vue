<template>
  <div>
    <a-descriptions title="Docker 版本信息" bordered size="small">
      <a-descriptions-item label="客户端版本" :span="1">
        {{ version.Version }}
      </a-descriptions-item>

      <a-descriptions-item label="服务端版本" :span="1">
        {{ info.ServerVersion }}
      </a-descriptions-item>

      <a-descriptions-item label="架构" :span="1">
        {{ version.Arch }}
      </a-descriptions-item>
      <a-descriptions-item label="Go版本">
        {{ version.GoVersion }}
      </a-descriptions-item>
      <a-descriptions-item label="内核版本">
        {{ version.KernelVersion }}
      </a-descriptions-item>
      <a-descriptions-item label="平台信息" :span="1">
        {{ version.Platform.Name }}
      </a-descriptions-item>

      <a-descriptions-item label="产品授权" :span="1">
        {{ info.ProductLicense }}
      </a-descriptions-item>

      <a-descriptions-item label="Docker目录" :span="1">
        {{ info.DockerRootDir }}
      </a-descriptions-item>

      <a-descriptions-item label="系统时间" :span="1">
        {{ formatUTCTime(info.SystemTime) }}
      </a-descriptions-item>


      <a-descriptions-item label="组件版本" :span="1">
        <template v-for="component of version.Components">
          <p>
            <span>{{ component.Name }} </span>
            <span style="margin-left: 0"> - {{ component.Version }}</span>
          </p>
        </template>
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
import {formatUTCTime} from '@/utils'

export default {
  name: "DockerInfo",
  props: {
    version: Object,
    info: Object
  },
  methods: {
    formatUTCTime: formatUTCTime
  }
}
</script>