<template>
  <div class="home">
    <DockerStatistics :version="version" :info="info"/>

    <div style="margin-top: 20px"/>
    <SystemInfo :info="systemInfo"/>

    <div style="margin-top: 20px"/>
    <DockerInfo :version="version" :info="info"/>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {formatUTCTime} from '../utils/index'
import systemInfoApi from '@/api/SystemInfoApi'

import DockerInfo from "@/components/home/DockerInfo";
import DockerStatistics from "@/components/home/DockerStatistics";
import SystemInfo from "@/components/home/SystemInfo";

export default {
  name: 'Home',
  components: {SystemInfo, DockerStatistics, DockerInfo},
  data() {
    return {
      version: {
        Version: '',
        GoVersion: '',
        Arch: '',
        KernelVersion: '',
        Components: [],
        Platform: {
          Name: ''
        }
      },
      systemInfo: {OS: '', Arch: '', Core: 1, HostName: '未知'}
    }
  }, methods: {
    ...mapActions({
      updateDockerInfo: 'updateDockerInfo'
    }), formatUTCTime: formatUTCTime
  }, computed: {
    info() {
      return this.$store.state.dockerInfo.info;
    }
  }, async beforeMount() {
    let systemInfoRes = await systemInfoApi.systemInfo();
    let dockerInfoRes = await systemInfoApi.dockerInfo();

    this.systemInfo = _.get(systemInfoRes, "data", {});
    this.version = _.get(dockerInfoRes, "data.Data.server", {});
  }, mounted() {
    this.updateDockerInfo()
  },
}
</script>
