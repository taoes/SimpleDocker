<template>
  <div>
    <a-steps :current="currentStepIndex">
      <a-step :title="step.title" :description="step.description" v-for="step in this.stepsInfo"/>
    </a-steps>

    <div id="containerInfoStep">
      <div class="containerInfo" style="">
        <ContainerBaseInfo :form="form" v-if="currentStepIndex === 0"/>
        <ContainerStoreInfo :form="form" v-if="currentStepIndex === 1"/>
      </div>
    </div>

  </div>
</template>

<script>
import ContainerBaseInfo from "@/components/container/ContainerBaseInfo";
import ContainerStoreInfo from "@/components/container/ContainerStoreInfo";
import {mapActions} from "vuex";

const stepsInfo = [];
stepsInfo.push(
    {title: '基础信息'},
    {title: '存储信息'},
    {title: '网络信息'},
    {title: '环境信息'},
    {title: '完成配置'},
)

export default {
  name: "CreateContainer",
  components: {ContainerBaseInfo, ContainerStoreInfo},
  data() {
    return {
      stepsInfo,
      currentStepIndex: 0,
      form: {
        imageTag: '',
        cpuCoreLimit: 1,
        memoryLimit: 1024,
      }
    }
  }, beforeMount() {
    this.updateVolumeList()
  }, methods: {
    ...mapActions({
      updateVolumeList: 'updateVolumeList'
    }),
    upStep: function () {
      if (this.currentStepIndex > 0) {
        this.currentStepIndex--;
      }
    },
    nextStep: function () {
      if (this.currentStepIndex < stepsInfo.length) {
        this.currentStepIndex++;
      }
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