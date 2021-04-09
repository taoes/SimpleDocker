<template>
  <div>
    <a-steps :current="currentStepIndex" @change="onStepChange">
      <a-step :title="step.title" :description="step.description" v-for="step in this.stepsInfo" :key="step.title"/>
    </a-steps>

    <div id="containerInfoStep">
      <div class="containerInfo" style="">
        <ContainerBaseInfo :form="form" v-if="currentStepIndex === 0"/>
        <ContainerStoreInfo :form="form" v-if="currentStepIndex === 1"/>
        <ContainerNetworkInfo :form="form" v-if="currentStepIndex === 2"/>
        <ContainerEnvInfo :form="form.envList" v-if="currentStepIndex === 3"/>
        <ContainerComplete :form="form" v-if="currentStepIndex === 4"/>
      </div>
    </div>

  </div>
</template>

<script>
import ContainerBaseInfo from "@/components/container/ContainerBaseInfo";
import ContainerStoreInfo from "@/components/container/ContainerStoreInfo";
import ContainerNetworkInfo from "@/components/container/ContainerNetworkInfo";
import ContainerEnvInfo from "@/components/container/ContainerEnvInfo";
import ContainerComplete from "@/components/container/ContainerComplete";


const stepsInfo = [
  {title: '基础信息'},
  {title: '存储信息'},
  {title: '网络信息'},
  {title: '环境信息'},
  {title: '完成配置'}];


export default {
  name: "CreateContainer",
  components: {ContainerBaseInfo, ContainerStoreInfo, ContainerNetworkInfo, ContainerEnvInfo, ContainerComplete},
  data() {
    return {
      stepsInfo,
      currentStepIndex: 0,
      form: {
        imageTag: '',
        restart: false,
        hostname: '',
        cpuCoreLimit: 1,
        memoryLimit: 1024,
        readonly: false,
        ip: '',
        dns: '',
        mac: '',
        bindNet: [],
        envList: [],
      }
    }
  }, methods: {
    // 返回上一步
    upStep: function () {
      if (this.currentStepIndex > 0) {
        this.currentStepIndex--;
      }
    },
    // 下一步
    nextStep: function () {
      if (this.currentStepIndex < stepsInfo.length) {
        this.currentStepIndex++;
      }
    },
    // 创建接口
    startRunContainer: function () {
      this.$message.info("OK.....")
    },
    // 取消创建新的容器
    cancelRunNewContainer: function () {
      this.$router.push("/content/image")
    },
    // Step 步骤改变
    onStepChange(current) {
      this.currentStepIndex = current;
    }
  }
}
</script>

<style scoped>
#containerInfoStep {
  width: 100%;
  height: 100%;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-grow: 1;
}

.containerInfo {
  width: 70%;
  height: fit-content;
}
</style>