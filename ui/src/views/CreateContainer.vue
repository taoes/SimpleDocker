<template>
  <div>
    <a-steps :current="currentStepIndex" @change="onStepChange">
      <a-step :title="step.title" :description="step.description" v-for="step in this.stepsInfo" :key="step.title"/>
    </a-steps>

    <div id="containerInfoStep">
      <div class="containerInfo" style="">
        <ContainerBaseInfo v-if="currentStepIndex === 0"/>
        <ContainerStoreInfo v-if="currentStepIndex === 1"/>
        <ContainerNetworkInfo v-if="currentStepIndex === 2"/>
        <ContainerEnvInfo v-if="currentStepIndex === 3"/>
        <ContainerComplete v-if="currentStepIndex === 4"/>
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
      currentStepIndex: 0
    }
  }, methods: {
    upStep: function () {
      // 返回上一步
      if (this.currentStepIndex > 0) {
        this.currentStepIndex--;
      }
    }, nextStep: function () {
      // 下一步
      if (this.currentStepIndex < stepsInfo.length) {
        this.currentStepIndex++;
      }
    }, cancelRunNewContainer: function () {
      // 取消创建新的容器
      this.$router.push("/content/image")
    }, onStepChange(current) {
      // 取消创建新的容器
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