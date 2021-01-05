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
        <a-statistic title="内存" :value="(info.MemTotal /1000000) .toFixed(2)" class="demo-class">
          <template #suffix>
            <span> M</span>
          </template>
        </a-statistic>
      </a-col>

    </a-row>


    <div style="margin-top: 40px"></div>
    <a-descriptions title="Docker 版本信息" bordered size="small">
      <a-descriptions-item label="版本" :span="1">
        {{version.Version}}
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
      <a-descriptions-item label="平台信息" :span="3">
        {{version.Platform.Name}}
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

  export default {
    name: 'Home',
    components: {
      HelloWorld
    }, data() {
      return {
        info: {
          Containers: 0,
          ContainersRunning: 0,
          Images: 0,
          NCPU: 0,
          MemTotal: 0
        },
        version: {
          Version: '',
          GoVersion: '',
          Arch: '',
          KernelVersion: '',
          Components: [],
          Platform: {
            Name: ""
          }
        }
      }
    }, mounted() {
      this.$axios.get('/api/docker/info').then(res => {
        let {Data} = res.data;
        this.info = Data;
      });

      this.$axios.get('/api/docker/version').then(res => {
        let {Data} = res.data;
        this.version = Data.server;
      });
    }
  }
</script>
