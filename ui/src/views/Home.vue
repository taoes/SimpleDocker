<template>
  <div class="home">
    <a-row :gutter="16">
      <a-col :span="6">
        <a-statistic title="容器数" :value="info.ContainersRunning" style="margin-right: 50px">
          <template #suffix>
            <span> / {{info.Containers}}</span>
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


    <div style="margin-top: 40px"></div>


    <a-descriptions title="Docker 版本信息" bordered size="small">
      <a-descriptions-item label="客户端版本" :span="1">
        {{version.Version}}
      </a-descriptions-item>

      <a-descriptions-item label="服务端版本" :span="1">
        {{info.ServerVersion}}
      </a-descriptions-item>

      <a-descriptions-item label="架构" :span="1">
        {{version.Arch}}
      </a-descriptions-item>
      <a-descriptions-item label="Go版本">
        {{version.GoVersion}}
      </a-descriptions-item>
      <a-descriptions-item label="内核版本">
        {{version.KernelVersion}}
      </a-descriptions-item>
      <a-descriptions-item label="平台信息" :span="1">
        {{version.Platform.Name}}
      </a-descriptions-item>

      <a-descriptions-item label="产品授权" :span="1">
        {{info.ProductLicense}}
      </a-descriptions-item>

      <a-descriptions-item label="Docker目录" :span="1">
        {{info.DockerRootDir}}
      </a-descriptions-item>

      <a-descriptions-item label="系统时间" :span="1">
        {{formatUTCTime(info.SystemTime)}}
      </a-descriptions-item>


      <a-descriptions-item label="组件版本" :span="1">

        <template v-for="component of version.Components">
          <p>
            <span>{{component.Name}} </span>
            <span style="margin-left: 0px"> - {{component.Version}}</span>
          </p>

        </template>

      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
  import HelloWorld from '../components/HelloWorld.vue'
  import {mapActions} from "vuex";
  import {formatUTCTime} from '../utils/index'

  export default {
    name: 'Home',
    components: {
      HelloWorld
    }, data() {
      return {
        version: {
          Version: '',
          GoVersion: '',
          Arch: '',
          KernelVersion: '',
          Components: [],
          Platform: {
            Name: ""
          }
        }, simpleDocker: {
          Version: '0.0.2'
        }
      }
    }, methods: {
      ...mapActions({
        updateDockerInfo: 'updateDockerInfo'
      }), formatUTCTime: formatUTCTime
    }, computed: {
      info() {
        return this.$store.state.dockerInfo.info;
      }
    }, mounted() {
      this.updateDockerInfo()
      this.$axios.get('/api/docker/version').then(res => {
        let {Data} = res.data;
        this.version = Data.server;
      });
    },
  }
</script>
